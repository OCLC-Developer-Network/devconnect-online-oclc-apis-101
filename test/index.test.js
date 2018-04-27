const request = require('supertest');
const expect = require('chai').expect;
const cheerio = require('cheerio');
let helper = require('./testHelper');

describe("routes", function(){
	before(() => {
		helper.moxios.install()
		helper.moxios.stubRequest('https://worldcat.org/bib/data/70775700', {
			status: 200,
			responseText: helper.bib_response
		});		
	})
	
	after(() => {
		helper.moxios.uninstall()
	})
	
	describe("#index", function(){
		it('It should response the GET method', () => {
			return request(helper.app).get("/").then(response => {
				expect(response.statusCode).to.equal(200);
				expect(response.text).to.have.string("OCLC Number:");
			})
		});
	});	
  
	describe("#readBib", function(){
	    it('It should response the GET method', async() => {
	    	let response = await request(helper.app).get("/bib/70775700");
	    	let $ = cheerio.load(response.text);
			expect(response.statusCode).to.equal(200)
			expect($('div#content h1').text()).to.have.string("Dogs and cats");
			expect($('div#record h4').text()).to.have.string("Raw MARC");
			expect($('pre', 'div#record').text()).to.not.be.null;
	    });
	});
	
	describe("#searchBib", function(){		
		it('It should response the POST method', async() => {
			let response = await request(helper.app).post("/bib").type("form").send({oclcnumber: "70775700"});
	    	let $ = cheerio.load(response.text);
			expect(response.statusCode).to.equal(200)
			expect($('div#content h1').text()).to.have.string("Dogs and cats");
			expect($('div#record h4').text()).to.have.string("Raw MARC");
			expect($('pre', 'div#record').text()).to.not.be.null;
		});
	});	 
});