const fs = require('fs');
const yaml = require('js-yaml');
const get_config = require("./src/config.js");
const moxios = require('moxios');
const accessToken = require('./test/mocks/AccessTokenMock');
const bib_response = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/bibResponse.xml')).toString();
const error_response_401 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse.xml')).toString();
const error_response_403 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse_403.xml')).toString();
const error_response_404 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse_404.xml')).toString();


moxios.install();

moxios.stubRequest('https://worldcat.org/bib/data/70775700', {
    status: 200,
    responseText: bib_response
  }); 

moxios.stubRequest('https://worldcat.org/bib/data/401', {
	  status: 401,
	  responseText: error_response_401
});

moxios.stubRequest('https://worldcat.org/bib/data/403', {
	  status: 403,
	  responseText: error_response_403
});

moxios.stubRequest('https://worldcat.org/bib/data/404', {
	  status: 404,
	  responseText: error_response_404
});

let environment = "test";

const decrypt = require("./src/config.js");
global.config = "";
get_config(environment)
	.then(function (output){
		global.config = yaml.load(output);
		let app = require('./src/server.js');
		app.set('accessToken', accessToken);
		let port = process.env.PORT || 8000;

		// Server
		app.listen(port, () => {
		    console.log(`Listening on: http://localhost:${port}`);
		});
		
	})
	.catch(function (err){
		throw ('Config failed to load' + err);
	});
