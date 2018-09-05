const awsServerlessExpress = require('aws-serverless-express');
const yaml = require('js-yaml');
const get_config = require("./src/config.js");
let environment = 'prod';

global.config = "";

module.exports.universal = function(event, context){
	get_config('prod')
	.then(function (output){
		global.config = yaml.load(output);
		let app = require('./src/server.js');		
		const server = awsServerlessExpress.createServer(app)
		return awsServerlessExpress.proxy(server, event, context);
	})
	.catch(function (err){
		throw ('Config failed to load' + err);
	});
}