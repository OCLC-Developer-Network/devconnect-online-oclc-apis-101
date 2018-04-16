# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 5 - Creating Models Using Test Driven Development

#### Test Setup
1. Open package.json
2. Add line to scripts section to run tests
```
    "test": "mocha"
```

3. Create a directory within `tests` called `mocks`
    1. Add the following files to `mocks` containing the linked code
        1. [bibResponse](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/tests/mocks/bibResponse.xml)
        2. [errorMock](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/tests/mocks/errorMock.js)
        3. [errorResponse](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/tests/mocks/errorResponse.xml)
        4. [errorResponse_403](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/tests/mocks/errorResponse_403.xml)
        5. [errorResponse_404](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/tests/mocks/errorResponse_404.xml)
        6. [access_token_response](https://raw.githubusercontent.com/OCLC-Developer-Network/devconnect2018precon/master/tests/mocks/access_token.json)

#### Write your first test

1. In tests directory create a file named bib.test.js to test your Bib Class 
2. Open bib.test.js and add constants for classes you want to use (WSKey and Access Token)
```
const expect = require('chai').expect;
const moxios = require('moxios');
const fs = require('fs');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const marc4js = require('marc4js');

const Bib = require('../src/Bib');
const bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bibResponse.xml')).toString();

``` 

3. Write for Test creating a Bib
    1. Create a new Bib object
        a. load API response
        b. parse out MARC record
        c. create a new Bib from MARC
    2. Test that it is an instance of a Bib object
    
```
describe('Create Bib test', () => {
    var bib;
      before(() => {
            let doc = new dom().parseFromString(bib_response);
            select = xpath.useNamespaces({"atom": "http://www.w3.org/2005/Atom", "rb": "http://worldcat.org/rb"});
            let record = select('//atom:content/rb:response', doc)
            marc4js.parse(record, {fromFormat: 'marcxml'}, function(err, records) {
                bib = new Bib(records[0]);
            });
          });
      
      it('Creates an bib object', () => {
          expect(bib).to.be.an.instanceof(Bib);
      });
});      
```

4. Make the test pass by creating Bib class and constructor
    1. In the src directory create a file named Bib.js to represent the Bib Class
    2. Open Bib.js, declare Bib class and add use constants for classes you want to use
    ```
    const axios = require("axios");
    const xpath = require('xpath');
    const dom = require('xmldom').DOMParser;
    const marc4js = require('marc4js');
    const S = require('string');
    
    const serviceUrl = 'https://worldcat.org/bib/data/';
    
    const BibError = require('../src/BibError');
    
    module.exports = class Bib {
    ```
     
    3. Create a constructor for the Bib class
    ```
    constructor(record) {
        this.record = record;
    }
    ```   
5. Run tests
```bash
npm test
```

6. Write a test for making sure a record property is set
    1. Make sure "Creates an bib object" passes
    2. Test that it is an instance of a marc4js.marc.Record object
```
      it('Sets the bib properties', () => {
        expect(bib.record).to.be.an.instanceof(marc4js.marc.Record);
      });
```

7. Run tests
```bash
npm test
```

#### Getters
1. Write a test to ensure "getter" functions are returning values
    1. Make sure "Sets the bib properties" passes
    2. Test each "getter" method returns appropriate value.
```
      it('Has functioning getters', () => {
        expect(bib.getID()).to.equal('70775700')
        expect(bib.getRecord()).to.be.an.instanceof(marc4js.marc.Record);
        expect(bib.getOCLCNumber()).to.equal('ocm70775700');
        expect(bib.getTitle()).to.equal("Dogs and cats");
        expect(bib.getAuthor()).to.equal("Jenkins, Steve");
      });
```
2. Write function to get the Id in Bib class
    ```
        getID(){
            var field_001 = this.record.controlFields.filter(controlField => controlField.tag === '001')[0].data
            if (isNaN(field_001)) {
                this.id = field_001.slice(3); 
            } else {
                this.id = field_001;
            }
            return this.id
        }
    ```

3. Run tests
```bash
npm test
```

4. Write function to get a record in Bib class

    ```
        getRecord(){
            return this.record;
        }
    ```

5. Run tests
```bash
npm test
```

6. Write function to get an OCLC Number in Bib class
    1. Use built-in functions on marc4js.marc.Record object to get the data in the 001
```    
    getOCLCNumber(){
        return this.record.controlFields.filter(controlField => controlField.tag === '001')[0].data;
    }
```

7. Run tests
```bash
npm test
```

8. Write function to get a title in Bib class
    1. Use built-in functions on marc4js.marc.Record object to get the data
```
    getTitle(){
        let title = this.record.dataFields.filter(dataField => S(dataField.tag).startsWith('24'))[0].findSubfield('a').data;
        if (this.record.dataFields.filter(dataField => S(dataField.tag).startsWith('24'))[0].findSubfield('b')){
            title += this.record.dataFields.filter(dataField => S(dataField.tag).startsWith('24'))[0].findSubfield('b').data;
        }
        title = S(title).chompRight(" /").s;
        return title;
    }
```
9. Run tests
```bash
npm test
```

10. Write function to get an Author in Bib class
    1. Use built-in functions on marc4js.marc.Record object to get the data
```
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
```

11. Run tests
```bash
npm test
```

#### Getting a Bib from the API
1. Tell tests what file to use for mocks

```
describe('Find Bib tests', () => {
  beforeEach(() => {
      moxios.install();
  });
  
  afterEach(() => {
      moxios.uninstall();
  });

  it('Get Bib by oclc number', () => {
      moxios.stubRequest('https://worldcat.org/bib/data/70775700', {
          status: 200,
          responseText: bib_response
        });
        // Test expects go here
  });
});        
```        

2. Find a Bib
3. Test that object returned is an instance of a Bib
```
    return Bib.find('70775700', 'tk_12345')
      .then(response => {
        //expect an Bib object back
        expect(response).to.be.an.instanceof(Bib);
      });
```

5. Make test pass by creating a static "find" function for the Bib
    1. Create a variable to hold the service url
    ```
        const serviceUrl = 'https://worldcat.org/bib/data/';
    ```
    5. Create a url for the request
    6. Create an HTTP client
    7. Create a set of headers
    8. try to make the HTTP request
        1. If successful
            1. Parse the response body XML
            2. Pull out MARC record string and use it to create a marc4js.marc.Record
        2. If fails
            1. Pass response off to BibError to handle
```    
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
```

9. Run tests
```bash
npm test
```
    
#### Write test for getting data from Bib
1. Test that getID method on bib object returns a value of 70775700 
2. Test that getRecords returns a marc4js.marc.Record object
3. Test that getOCLCNumber method on bib object returns a value of ocm70775700
4. Test that getTitle method on bib object returns a value of Dogs and cats
5. Test that getAuthor method on bib object returns a value of Jenkins, Steve

```        
    expect(response.getID()).to.equal('70775700')
    expect(response.getRecord()).to.be.an.instanceof(marc4js.marc.Record);
    expect(response.getOCLCNumber()).to.equal('ocm70775700');
    expect(response.getTitle()).to.equal("Dogs and cats");
    expect(response.getAuthor()).to.equal("Jenkins, Steve");
```

6. Run tests
```bash
npm test
```       

#### Write the first test for the BibError Class
1. In tests directory create a file named error.test.js to test your BibError Class 
2. Open error.test.js and add constants for classes you want to use (WSKey and Access Token)

```
const expect = require('chai').expect;
const moxios = require('moxios');
const fs = require('fs');
var http = require('http');

const BibError = require('../src/BibError');
const error_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse.xml')).toString();
const Bib = require('../src/Bib');

const error_mock = require('./mocks/errorMock')
```
 
3. Write for Test creating a BibError
    1. Create a new BibError object
    2. Test that it is an instance of a BibError object

```
describe('Create Error test', () => {
    var error;
      before(() => {
            error = new BibError(error_mock);
          });
      
      it('Creates an Error object', () => {
          expect(error).to.be.an.instanceof(BibError);
      });
});      
```

6. Make the test pass by creating BibError class and constructor
    1. In the src directory create a file named BibError.js to represent the BibError Class
    2. Open BibError.js and declare BibError class
    ```
    const xpath = require('xpath');
    const dom = require('xmldom').DOMParser;

    module.exports = class BibError {
    }
    
    ```
    
    3. Create a constructor for the BibError class
    ```
    constructor(error) {
        this.error = error;
        if (this.error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.code = this.error.response.status;
            let doc = new dom().parseFromString(this.error.response.data);
            this.message = doc.getElementsByTagName("message")[0].firstChild.data;
            this.detail = doc.getElementsByTagName("detail")[0].firstChild.data;
            this.request = this.error.request;
          } else if (this.error.request) {
            // The request was made but no response was received
            this.request = this.error.request;
          } else {
            // Something happened in setting up the request that triggered an Error
            this.message = this.error.message;
          }   
    }
    ```   
    
7. Run tests
```bash
npm test
```

#### Properties set
1. Write code to ensure error properties are set
```
      it('Sets the Error properties', () => {
        expect(error.error).to.be.an.instanceof(Error);
        expect(error.code).to.equal(401)
        expect(error.message).to.equal('AccessToken {tk_12345} is invalid')
        expect(error.detail).to.equal('Authorization header: Bearer tk_12345')
      });
```

2. Run tests
```bash
npm test
```   

#### Getters
1. Write a test to ensure "getter" functions are returning values
```
    it('Has functioning getters', () => {
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(401)
        expect(error.getMessage()).to.equal('AccessToken {tk_12345} is invalid')
        expect(error.getDetail()).to.equal('Authorization header: Bearer tk_12345')
      });
```

2. Write code for getting a request error
```
    function getRequestError()
    {
        return $this->requestError;
    }
```

3. Run tests
```bash
npm test
``` 

4. Create function to retrieve error code
    ```
    getCode(){
        return this.code;
    }
    ```
5. Run tests
```bash
npm test
```       

6. Create function to retrieve error message
    ```
    getMessage(){
        return this.message
    }
    ```
7. Run tests
```bash
npm test
```           

8. Create function to retrieve error detail
```
    getDetail(){
        return this.detail
    }
```

9. Run tests
```bash
npm test
```   

#### Test that an API error can be properly parsed
1. Create tests for parsing API errors
    1. Tell tests what file to use for mocks
    2. Call Bib::find in a failed fashion
    3. Test error is an instance of BibError
    4. Test the getCode() method returns 401
    5. Test the getMessage() method returns AccessToken {tk_12345} is invalid
    6. Test the getDetail() method returns Authorization header: Bearer tk_12345

```
describe('API Error tests', () => {
  beforeEach(() => {
      moxios.install();
  });
  
  afterEach(() => {
      moxios.uninstall();
  });

  it('Returns a 401 Error from an HTTP request', () => {
      moxios.stubRequest('https://worldcat.org/bib/data/12345', {
          status: 401,
          responseText: error_response
      });
      
    return Bib.find('12345', 'tk_12345')
      .catch(error => {
        //expect an Error object back
        expect(error).to.be.an.instanceof(BibError);
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(401);
        expect(error.getMessage()).to.equal('AccessToken {tk_12345} is invalid')
        expect(error.getDetail()).to.equal('Authorization header: Bearer tk_12345')
        
      });
  });
  
    it('Returns a 403 Error from an HTTP request', () => {
      moxios.stubRequest('https://worldcat.org/bib/data/403', {
          status: 403,
          responseText: error_response_403
      });
      
    return Bib.find('403', 'tk_12345')
      .catch(error => {
        //expect an Error object back
        expect(error).to.be.an.instanceof(BibError);
        expect(error.getRequestError()).to.be.an.instanceof(Error);
        expect(error.getCode()).to.equal(403);
        expect(error.getMessage()).to.equal('AccessToken {tk_12345} does not have access to service {WorldCatMetadataAPI}');
        expect(error.getDetail()).to.equal('Authorization header: Bearer tk_12345');
        
      });
  });  
  
  it('Returns a 404 Error from an HTTP request', () => {
      moxios.stubRequest('https://worldcat.org/bib/data/404', {
          status: 404,
          responseText: error_response_404
      });
      
      return Bib.find('404', 'tk_12345')
        .catch(error => {
          //expect an Error object back
          expect(error).to.be.an.instanceof(BibError);
          expect(error.getRequestError()).to.be.an.instanceof(Error);
          expect(error.getCode()).to.equal(404);
          expect(error.getMessage()).to.equal('Unable to locate resource: 404.');
          expect(error.getDetail()).undefined;
          
        });
    });
});
```

2. Run tests
```bash
npm test
```    

**[on to Part 6](tutorial-06.md)**

**[back to Part 4](tutorial-04.md)**