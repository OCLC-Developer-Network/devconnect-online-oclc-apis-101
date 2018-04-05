const yaml = require('js-yaml');
const get_config = require("./src/config.js");
let environment = 'prod';

global.config = "";
get_config(environment)
	.then(function (output){
		global.config = yaml.load(output);
		let app = require('./src/server.js');
		let port = process.env.PORT || 8000;

		// Server
		app.listen(port, () => {
		    console.log(`Listening on: http://localhost:${port}`);
		});
		
	})
	.catch(function (err){
		throw ('Config failed to load' + err);
	});