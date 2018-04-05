"use strict";
const fs = require('fs');
const AWS = require('aws-sdk');

module.exports = function get_config(environment) {
	return new Promise(function (res, reject){
	const kms = new AWS.KMS({'region': 'us-east-1'});

	const params = {
	  CiphertextBlob: fs.readFileSync(environment + "_config_encrypted.txt")
	}

	kms.decrypt(params, function (err, data) {
	  if (err) {
	    reject(err);
	  } else {
	    // Get document, or throw exception on error
	    res(data['Plaintext'].toString());
	  }
	})
	});
};