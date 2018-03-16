const axios = require("axios");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const marc4js = require('marc4js');
const S = require('string');

const serviceUrl = 'https://worldcat.org/bib/data/';

const BibError = require('../src/BibError');

module.exports = class Bib {
    constructor(record) {
	    this.record = record;
    }
    
    getID(){
    	var field_001 = this.record.controlFields.filter(controlField => controlField.tag === '001')[0].data
	    if (isNaN(field_001)) {
	    	this.id = field_001.slice(3); 
	    } else {
	    	this.id = field_001;
	    }
	    return this.id
    }
    
    getOCLCNumber(){
    	return this.record.controlFields.filter(controlField => controlField.tag === '001')[0].data;
    }

    getTitle(){
		let title = this.record.dataFields.filter(dataField => S(dataField.tag).startsWith('24'))[0].findSubfield('a').data;
		if (this.record.dataFields.filter(dataField => S(dataField.tag).startsWith('24'))[0].findSubfield('b')){
			title += this.record.dataFields.filter(dataField => S(dataField.tag).startsWith('24'))[0].findSubfield('b').data;
		}
		title = S(title).chompRight(" /").s;
		return title;
    }
    
    getAuthor(){
    	let author;
		if (this.record.dataFields.filter(dataField => dataField.tag === '100')) {
			author = this.record.dataFields.filter(dataField => dataField.tag === "100")[0].findSubfield('a').data;
		} else if (this.record.dataFields.filter(dataField => dataField.tag === '110')) {
			author = this.record.dataFields.filter(dataField => dataField.tag === "110")[0].findSubfield('a').data;
		} else if (this.record.dataFields.filter(dataField => dataField.tag === '111')){
			author = this.record.dataFields.filter(dataField => dataField.tag === "111")[0].findSubfield('a').data;
		} else if (this.record.dataFields.filter(dataField => dataField.tag === '700')) {
			author = this.record.dataFields.filter(dataField => dataField.tag === "700")[0].findSubfield('a').data;
		} else if (this.record.dataFields.filter(dataField => dataField.tag === '710')) {
			author = this.record.dataFields.filter(dataField => dataField.tag === '710')[0].findSubfield('a').data;
		} else if (this.record.dataFields.filter(dataField => dataField.tag === '711')) {
			author = this.record.dataFields.filter(dataField => dataField.tag === "711")[0].findSubfield('a').data;
		} else {
			author = "";
		}
		author = S(author).chompRight(',').s;
		author= S(author).chompRight('.').s;

		return author;
    }
    
    getRecord(){
    	return this.record;
    }
    
    getRecordAsString(){
    	let record = this.record
    	return new Promise(function (res, reject){
    		marc4js.transform(record, {toFormat: 'text'}, function(err, output) {
    			if (err){
    				reject(err);
    			}else {
    				res(output);
    			}
        	});
    	});
    	
    }
    
    
    static find(oclcnumber, accessToken) {
    	var config = {
    			  headers: {
    				  'Authorization': 'Bearer ' + accessToken,
    				  'Accept': 'application/atom+xml;content="application/vnd.oclc.marc21+xml"',
    				  'User-Agent': 'node.js KAC client'
    			  }
    			};
    	
    	var url = serviceUrl + oclcnumber;
        return new Promise(function (resolve, reject) {
            axios.get(url, config)
          		.then(response => {
          			// parse out the MARC Record
        			let doc = new dom().parseFromString(response.data);
        			let select = xpath.useNamespaces({"atom": "http://www.w3.org/2005/Atom", "rb": "http://worldcat.org/rb"});
        			let record = select('//atom:content/rb:response', doc)
          			marc4js.parse(record, {fromFormat: 'marcxml'}, function(err, records) {
          				resolve(new Bib(records[0]));
          			});
          	    		    	
          	    })
          		.catch (error => {
          			reject(new BibError(error));
          		});
        });
    }
};
