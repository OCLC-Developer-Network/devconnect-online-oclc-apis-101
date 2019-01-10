const fs = require('fs');
const AWS = require('aws-sdk');
const yaml = require('js-yaml');
let environment = 'prod';

const params = {
		  CiphertextBlob: fs.readFileSync(environment + "_config_encrypted.txt")
		}

const kms = new AWS.KMS({'region': 'us-east-1'});

global.config = "";

async function startApp(){
	try {
		let data = await kms.decrypt(params).promise();
		global.config = yaml.load(data['Plaintext'].toString());
		let app = require('./src/server.js');
		let port = process.env.PORT || 8000;
	
		// Server
		app.listen(port, () => {
		    console.log(`Listening on: http://localhost:${port}`);
		});
			
	} catch (Error){
		console.log(Error, Error.stack);
	    return Error;
	}
}
startApp();