const AWS = require('aws-sdk');
const awsServerlessExpress = require('aws-serverless-express');
const yaml = require('js-yaml');
let environment = 'prod';

const params = {
		  CiphertextBlob: fs.readFileSync(environment + "_config_encrypted.txt")
		}

const kms = new AWS.KMS({'region': 'us-east-1'});

global.config = "";

module.exports.universal = async function(event, context){
	try {
		let data = await kms.decrypt(params).promise();
		
		global.config = yaml.load(data['Plaintext'].toString());
		let app = require('./src/server.js');		
		const server = awsServerlessExpress.createServer(app)
		return awsServerlessExpress.proxy(server, event, context);
	} catch (Error){
		console.log(Error, Error.stack);
	    return Error;
	}
}