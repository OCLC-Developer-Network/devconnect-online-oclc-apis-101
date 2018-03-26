"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const yaml = require('js-yaml');
const Wskey = require("nodeauth/src/wskey");
const User = require("nodeauth/src/user");

const Bib = require("./bib.js")
const BibError = require("./BibError.js")

const isLambda = !!(process.env.LAMBDA_TASK_ROOT || false);

const config = yaml.load(fs.readFileSync(require('path').resolve(__dirname, '../config.yml')).toString());

const options = {
    services: ["WorldCatMetadataAPI"]
};

const user = new User(config['prod']['institution'], config['prod']['principalID'], config['prod']['principalIDNS']);
const wskey = new Wskey(config['prod']['wskey'], config['prod']['secret'], options);

const app = express();

this.accessToken = null;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', 'views'); 
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let autheMiddleware = express.Router()

const context = this;

autheMiddleware.post('/bib', function (req, res, next) {
	if (context.accessToken && context.accessToken.getAccessTokenString()){
		console.log('I think there is an Access Token')
		next()
	}else {
		// request an Access Token
		wskey.getAccessTokenWithClientCredentials(config['prod']['institution'], config['prod']['institution'], user)
	        .then(function (accessToken) {
	            context.accessToken = accessToken;
	            next();
	        })
	        .catch(function (err) {
	            //catch the error
	        	console.log(err);
	        	//res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
	        })
	}
});

autheMiddleware.get('/bib/:id', function (req, res, next) {
	if (context.accessToken && context.accessToken.getAccessTokenString()){
		next()
	}else {
		// request an Access Token
		wskey.getAccessTokenWithClientCredentials(config['prod']['institution'], config['prod']['institution'], user)
	        .then(function (accessToken) {
	            context.accessToken = accessToken;
	            next();
	        })
	        .catch(function (err) {
	            //catch the error
	        	console.log(err);
	        	//res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
	        })
	}
});

app.use('/', autheMiddleware);
 
app.get('/', (req, res) => {   
   if (isLambda) {
	   var action = "production/bib";
   } else {
	   var action = "bib";
   }
   
   res.render('index', {action: action});

   
});

app.post('/bib', (req, res, next) => {
	var id = req.body.oclcnumber;
	Bib.find(id, context.accessToken.getAccessTokenString())
	.then(bib => {
		bib.getRecordAsString()
		.then(function (output){
			res.render('display-bib', {bib: bib, recordAsString: output});
		})
		.catch(function (err){
			res.render('display-error', {error: err});
		})
		
	})
	.catch (error => {
		res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
	})		
});

app.get('/bib/:id', (req, res, next) => {
	var id = req.params['id'];
	
	Bib.find(id, context.accessToken.getAccessTokenString())
		.then(bib => {
			bib.getRecordAsString()
			.then(function (output){
				res.render('display-bib', {bib: bib, recordAsString: output});
			})
			.catch(function (err){
				res.render('display-error', {error: err, error_message: "something happened with the transform", error_detail: "", oclcnumber: id});
			})
		})
		.catch (error => {
			res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
		})
});

//Server
module.exports = app;