const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

module.exports = class Error {
    constructor(error) {
    	this.error = error;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
        	this.code = error.response.status;
    	    let doc = new dom().parseFromString(response);
    		this.message = doc.message;
    		this.details = doc.details;
            this.request = error.request;
          } else if (error.request) {
            // The request was made but no response was received
            this.request = error.request;
          } else {
            // Something happened in setting up the request that triggered an Error
            this.message = error.message;
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