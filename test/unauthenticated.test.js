const request = require('supertest');
const expect = require('chai').expect;
const cheerio = require('cheerio');
let helper = require('./testHelper');
const app = require('../src/server');

describe("Unauthenticated routes", function(){
	before(() => {
		app.set("accessToken", null);
	})

	describe("#accessTokenError", function(){	  
		helper.nock('https://authn.sd00.worldcat.org/oauth2')
		.post('/accessToken?grant_type=client_credentials&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=WorldCatMetadataAPI')
		.replyWithFile(401, __dirname + '/mocks/access_token_error.json', { 'Content-Type': 'application/json' });
		
		it('It should response the GET method', async() => {
	    	let response = await request(helper.app).get("/bib/1");
	    	let $ = cheerio.load(response.text);
            expect(response.statusCode).to.equal(200);
			expect($('div#content h1').text()).to.have.string("System Error");
			expect($('div#error_content > p#status').text()).to.have.string("Status - 401");
            expect($('div#error_content > p#message').text()).to.have.string("Message - WSKey 'test' is invalid");
			expect($('div#error_content > p#detail').text()).to.have.string("Authorization header: http://www.worldcat.org/wskey/v2/hmac/v1 clientId=\"test\", timestamp=\"1524513365\", nonce=\"a2b79385\", signature=\"yS+aKqSbJ2PjL9S5AuA5zqo+t2QfWLl8W9wWbACnFMk=\", principalID=\"id\", principalIDNS=\"namespace\"");
	    });
	});
  
});