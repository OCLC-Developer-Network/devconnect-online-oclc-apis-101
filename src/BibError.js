const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

module.exports = class BibError {
    constructor(error) {
    	this.error = error;
        if (this.error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
        	if (this.error.response.status) {
        		this.code = this.error.response.status;
        	} else {
        		this.code = this.error.response.statusCode;
        	}
        	this.request = this.error.request;
        	if (this.error.response.data){
        		if (typeof this.error.response.data === 'string') {
	        		try {
	        			let doc = JSON.parse(this.error.response.data);
	        			this.message = this.doc.message;
	            		this.detail = this.doc.details;
	            		console.log(doc);
	        		} catch (e) {
	        			let doc = new dom().parseFromString(this.error.response.data);
	        			
	        	    	if (doc.getElementsByTagName("message")[0]){
	        	    		this.message = doc.getElementsByTagName("message")[0].firstChild.data;
	        	    	}
	        	    	if (doc.getElementsByTagName("detail")[0]) { 
	        	    		this.detail = doc.getElementsByTagName("detail")[0].firstChild.data;
	        	    	} 
	        		}
        		} else {
            		this.doc = this.error.response.data;
            		this.message = this.doc.message;
            		this.detail = this.doc.details; 
        		}
        	} else if (typeof this.error.response.body === 'string') {
        		this.doc = JSON.parse(this.error.response.body);
        		this.message = this.doc.message;
        		this.detail = this.doc.details;
        	} else if (this.error.response.body) {
        		this.doc = this.error.response.body;
        		this.message = this.doc.message;
        		this.detail = this.doc.details;       		
        	}
          } else if (this.error.request) {
            // The request was made but no response was received
            this.request = this.error.request;
          } else {
            // Something happened in setting up the request that triggered an Error
            this.message = this.error.message;
          }
	    
	    
    }
	getRequestError(){
		return this.error;
	}
	
	getCode(){
		return this.code;
	}
	
	getMessage(){
		return this.message
	}
	
	getDetail(){
		return this.detail
	}

};