const request = require('supertest');
const expect = require('chai').expect;
const cheerio = require('cheerio');
let helper = require('./testHelper');

describe("Error routes", function(){
	before(() => {
		helper.moxios.install()
		helper.moxios.stubRequest('https://worldcat.org/bib/data/401', {
			status: 401,
			responseText: helper.error_response
		});
		helper.moxios.stubRequest('https://worldcat.org/bib/data/403', {
			status: 403,
			responseText: helper.error_response_403
		});
		helper.moxios.stubRequest('https://worldcat.org/bib/data/404', {
			status: 404,
			responseText: helper.error_response_404
		});
	})
	
	after(() => {
		helper.moxios.uninstall()
	})

	describe("#Bib Error 401", function(){
	    it('It should response the GET method', async() => {
	    	let response = await request(helper.app).get("/bib/401");
	    	let $ = cheerio.load(response.text);
			expect(response.statusCode).to.equal(200)
			expect($('div#content h1').text()).to.have.string("System Error");
			expect($('div#error_content > p#status').text()).to.have.string("Status - 401");
			expect($('div#error_content > p#message').text()).to.have.string("Message - AccessToken {tk_12345} is invalid");
			expect($('div#error_content > p#detail').text()).to.have.string("Authorization header: Bearer tk_12345");
	    });
		});
	
	describe("#Bib Error 403", function(){
	    it('It should response the GET method', async() => {
	    	let response = await request(helper.app).get("/bib/403");
	    	let $ = cheerio.load(response.text);
			expect(response.statusCode).to.equal(200)
			expect($('div#content h1').text()).to.have.string("System Error");
			expect($('div#error_content > p#status').text()).to.have.string("Status - 403");
			expect($('div#error_content > p#message').text()).to.have.string("Message - AccessToken {tk_12345} does not have access to service {WorldCatMetadataAPI}");
			expect($('div#error_content > p#detail').text()).to.have.string("Authorization header: Bearer tk_12345");
	    });
		});	
	
	describe("#Bib Error 404", function(){
	    it('It should response the GET method', async() => {
	    	let response = await request(helper.app).get("/bib/404");
	    	let $ = cheerio.load(response.text);
			expect(response.statusCode).to.equal(200)
			expect($('div#content h1').text()).to.have.string("System Error");
			expect($('div#error_content > p#status').text()).to.have.string("Status - 404");
			expect($('div#error_content > p#message').text()).to.have.string("Unable to locate resource: 404.");
	    });
		}); 	
});
