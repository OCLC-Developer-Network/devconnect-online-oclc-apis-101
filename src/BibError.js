const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

module.exports = class BibError {
    constructor(error) {
    	this.error = error;
        if (this.error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
        	this.code = this.error.response.status;
        	this.request = this.error.request;
        	let doc = new dom().parseFromString(this.error.response.data);

	    	if (doc.getElementsByTagName("message")[0]){
	    		this.message = doc.getElementsByTagName("message")[0].firstChild.data;
	    	}
	    	if (doc.getElementsByTagName("detail")[0]) { 
	    		this.detail = doc.getElementsByTagName("detail")[0].firstChild.data;
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