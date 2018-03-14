const expect = require('chai').expect;
const moxios = require('moxios');
const fs = require('fs');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const marc4js = require('marc4js');

const Bib = require('../src/Bib');
const bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bibResponse.xml')).toString();

describe('Create Bib test', () => {
	var bib;
	  before(() => {
			let doc = new dom().parseFromString(bib_response);
			select = xpath.useNamespaces({"atom": "http://www.w3.org/2005/Atom", "rb": "http://worldcat.org/rb"});
			let record = select('//atom:content/rb:response', doc)
  			marc4js.parse(record, {fromFormat: 'marcxml'}, function(err, records) {
  				bib = new Bib(records[0]);
  			});
		  });
	  
	  it('Creates an bib object', () => {
		  expect(bib).to.be.an.instanceof(Bib);
	  });
	  
	  it('Sets the bib properties', () => {
        expect(bib.record).to.be.an.instanceof(marc4js.marc.Record);
	  });
	  
	  it('Has functioning getters', () => {
        expect(bib.getID()).to.equal('70775700')
        expect(bib.getRecord()).to.be.an.instanceof(marc4js.marc.Record);
        expect(bib.getOCLCNumber()).to.equal('ocm70775700');
        expect(bib.getTitle()).to.equal("Dogs and cats");
        expect(bib.getAuthor()).to.equal("Jenkins, Steve");
	  });
	  
	});

describe('Find Bib tests', () => {
  beforeEach(() => {
	  moxios.install();
  });
  
  afterEach(() => {
	  moxios.uninstall();
  });

  it('Get Bib by oclc number', () => {
      moxios.stubRequest('https://worldcat.org/bib/data/70775700', {
          status: 200,
          responseText: bib_response
        });  
    return Bib.find('70775700', 'tk_12345')
      .then(response => {
        //expect an Bib object back
    	expect(response).to.be.an.instanceof(Bib);

        expect(response.getID()).to.equal('70775700')
        expect(response.getRecord()).to.be.an.instanceof(marc4js.marc.Record);
        expect(response.getOCLCNumber()).to.equal('ocm70775700');
        expect(response.getTitle()).to.equal("Dogs and cats");
        expect(response.getAuthor()).to.equal("Jenkins, Steve");
        
      });
  });
});
