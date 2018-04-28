const expect = require('chai').expect;
const nock = require('nock');
const moxios = require('moxios');
const fs = require('fs');
const yaml = require('js-yaml');
const get_config = require("../src/config.js");

global.config = yaml.load(get_config("test"));

const BibError = require('../src/BibError');
const error_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse.xml')).toString();
const error_response_403 = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse_403.xml')).toString();
const error_response_404 = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse_404.xml')).toString();
const access_token_error = fs.readFileSync(require('path').resolve(__dirname, './mocks/access_token.json')).toString();
const Bib = require('../src/Bib');

const error_mock = require('./mocks/errorMock');
const accesstoken_error_mock = require('./mocks/accessTokenErrorMock');

describe('Create Error test', () => {
	var error;
	  before(() => {
		  	error = new BibError(error_mock);
		  });
	  
	  it('Creates an Error object', () => {
		  expect(error).to.be.an.instanceof(BibError);
	  });
	  
	  it('Sets the Error properties', () => {
        expect(error.error).to.be.an.instanceof(Error);
        expect(error.code).to.equal(401)
        expect(error.message).to.equal('AccessToken {tk_12345} is invalid')
        expect(error.detail).to.equal('Authorization header: Bearer tk_12345')
	  });
	  
	  it('Has functioning getters', () => {
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(401)
        expect(error.getMessage()).to.equal('AccessToken {tk_12345} is invalid')
        expect(error.getDetail()).to.equal('Authorization header: Bearer tk_12345')
	  });
	  
	});

describe('Create Error from Access Token test', () => {
	var error;
	  before(() => {
		  	error = new BibError(accesstoken_error_mock);
		  });
	  
	  it('Creates an Error object', () => {
		  expect(error).to.be.an.instanceof(BibError);
	  });
	  
	  it('Sets the Error properties', () => {
        expect(error.error).to.be.an.instanceof(Error);
        expect(error.code).to.equal(401)
        expect(error.message).to.equal("WSKey 'test' is invalid")
        expect(error.detail).to.equal("Authorization header: http://www.worldcat.org/wskey/v2/hmac/v1 clientId=\"test\", timestamp=\"1524513365\", nonce=\"a2b79385\", signature=\"yS+aKqSbJ2PjL9S5AuA5zqo+t2QfWLl8W9wWbACnFMk=\", principalID=\"id\", principalIDNS=\"namespace\"")
	  });
	  
	  it('Has functioning getters', () => {
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(401)
        expect(error.getMessage()).to.equal("WSKey 'test' is invalid")
        expect(error.getDetail()).to.equal("Authorization header: http://www.worldcat.org/wskey/v2/hmac/v1 clientId=\"test\", timestamp=\"1524513365\", nonce=\"a2b79385\", signature=\"yS+aKqSbJ2PjL9S5AuA5zqo+t2QfWLl8W9wWbACnFMk=\", principalID=\"id\", principalIDNS=\"namespace\"")
	  });
	  
	});


describe('API Error tests', () => {
  beforeEach(() => {
	  moxios.install();
  });
  
  afterEach(() => {
	  moxios.uninstall();
  });

  it('Returns a 401 Error from an HTTP request', () => {
	  moxios.stubRequest('https://worldcat.org/bib/data/401', {
		  status: 401,
		  responseText: error_response
	  });
	  
    return Bib.find('401', 'tk_12345')
      .catch(error => {
        //expect an Error object back
        expect(error).to.be.an.instanceof(BibError);
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(401);
        expect(error.getMessage()).to.equal('AccessToken {tk_12345} is invalid')
        expect(error.getDetail()).to.equal('Authorization header: Bearer tk_12345')
        
      });
  });
  
  it('Returns a 403 Error from an HTTP request', () => {
	  moxios.stubRequest('https://worldcat.org/bib/data/403', {
		  status: 403,
		  responseText: error_response_403
	  });
	  
    return Bib.find('403', 'tk_12345')
      .catch(error => {
        //expect an Error object back
        expect(error).to.be.an.instanceof(BibError);
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(403);
        expect(error.getMessage()).to.equal('AccessToken {tk_12345} does not have access to service {WorldCatMetadataAPI}');
        expect(error.getDetail()).to.equal('Authorization header: Bearer tk_12345');
        
      });
  });  
  
  it('Returns a 404 Error from an HTTP request', () => {
  	  moxios.stubRequest('https://worldcat.org/bib/data/404', {
  		  status: 404,
  		  responseText: error_response_404
  	  });
  	  
      return Bib.find('404', 'tk_12345')
        .catch(error => {
          //expect an Error object back
          expect(error).to.be.an.instanceof(BibError);
          expect(error.getRequestError()).to.be.an.instanceof(Error);
          expect(error.getCode()).to.equal(404);
          expect(error.getMessage()).to.equal('Unable to locate resource: 404.');
          expect(error.getDetail()).undefined;
          
        });
    });
    
});
