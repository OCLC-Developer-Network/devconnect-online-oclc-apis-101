# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 13 - Automating Acceptance testing

#### Configure the test environment
1. In the tests folder create a folder named features
2. In the features folder create a older step_definitions
3. In the features folder create a older support
4. In the support folder create a file mink.js
5. Open mink.js and add the following

```
const cucumber = require('cucumber');
const mink = require('cucumber-mink');

const driver = new mink.Mink({
  baseUrl: 'http://localhost:8080',
  viewport: {
    width: 1366,
    height: 768,
  },
});

driver.hook(cucumber);
```

6. In the step_definitions folder create a file mink_gherkin.js
7. Open mink_gherkin.js and add the following
```
const cucumber = require('cucumber');
const mink = require('cucumber-mink');

mink.gherkin(cucumber);
``` 

#### Create test configuration of application that use mocks
1. In project root create a file test.js
2. Open test.js and add the following

```
const fs = require('fs');
const moxios = require('moxios');
const access_token = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/access_token.json')).toString();
const bib_response = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/bibResponse.xml')).toString();
const error_response_401 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse.xml')).toString();
const error_response_403 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse_403.xml')).toString();
const error_response_404 = fs.readFileSync(require('path').resolve(__dirname, 'test/mocks/errorResponse_404.xml')).toString();


moxios.install();

// get a valid token
moxios.stubRequest('https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=client_credentials&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=WorldCatMetadataAPI', {
      status: 200,
      responseText: access_token
});

moxios.stubRequest('https://worldcat.org/bib/data/70775700', {
    status: 200,
    responseText: bib_response
  }); 

moxios.stubRequest('https://worldcat.org/bib/data/401', {
      status: 401,
      responseText: error_response_401
});

moxios.stubRequest('https://worldcat.org/bib/data/403', {
      status: 403,
      responseText: error_response_403
});

moxios.stubRequest('https://worldcat.org/bib/data/404', {
      status: 404,
      responseText: error_response_404
});

let app = require('./src/server.js');
let port = process.env.PORT || 8000;

// Server
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});
```

### Add scripts to start test server and run tests
1. Open package.json
2. In the script section add the following lines
```
    "test_server": "nodemon test.js",
    "cucumber_tests": "cucumber-js test/features"
``` 

#### Writing Tests
1. Write a feature to test rendering the Search form
    1. In features directory, create file searchForm.feature
    2. Add test code
    ```
        Feature: View Search Form
          As a library cataloger
          I want to view the search form
          so that search for an OCLC Number
          
          Background:
            Given I browse "http://localhost:8000/"
          
          Scenario: Successfully View Search form
            Given I am on homepage
            Then I should see "Search by OCLC Number" in the "h1" element
            And the "form" element should exist
            And the "input[name=oclcnumber]" element should exist
            And the "input[name=search]" element should exist
    ```    
2. Write a feature to test submitting a Search via the form
    1. In features directory, create file submitSearchForm.feature
    2. Add test code
    ```
        Feature: Submit Search Form
          As a library cataloger
          I want submit a search for an OCLC Number
          so I can view the associated MARC record
        
          Background:
            Given I browse "http://localhost:8000/"
          
          Scenario: Successfully Submit Search
            Given I am on homepage
            And I fill in "input[name='oclcnumber']" with:
            """
            70775700
            """
            When I submit "form" form
            Then I should see "Dogs and cats" in the "div#content > h1" element
            And I should see "Raw MARC" in the "div#record > h4" element
            And the "div#raw_record pre" element should exist
    ```    
3. Write a feature to test viewing a specific bibliographic record
    1. In features directory, create file viewBib.feature
    2. Add test code
    ```
        Feature: View Bib Record
          As a library cataloger
          I want to view a bib record
          so that I can examine its properties
          
          Background:
            Given I browse "http://localhost:8000/"  
          
          Scenario: Successfully View Bib
            When I am on "/bib/70775700"
            Then I should see "Dogs and cats" in the "div#content > h1" element
            And I should see "Raw MARC" in the "div#record > h4" element 
            And the "div#raw_record pre" element should exist
    ```
4. Write a feature to test for viewing errors
    1. In features directory, create file viewError.feature
    2. Add test code
    ```
    @error
    Feature: View Error
      As a library cataloger
      I want to view a usable error message when something fails
      so that I can tell support what is wrong
      
    Background:
    Given I browse "http://localhost:8000/"
      
      Scenario: Unsuccessfully View Bib - Invalid Token
        When I am on "/bib/401"
        Then I should see "System Error" in the "div#content > h1" element
        And I should see "Status - 401" in the "div#error_content > p#status" element
        And I should see "Message - AccessToken {tk_12345} is invalid" in the "div#error_content > p#message" element
        And I should see "Authorization header: Bearer tk_12345" in the "div#error_content > p#detail" element
    
      Scenario: Unsuccessfully View Bib - Expired Token
        When I am on "/bib/403"
        Then I should see "System Error" in the "div#content > h1" element
        And I should see "Status - 401" in the "div#error_content > p#status" element
        And I should see "Message - AccessToken {tk_12345} does not have access to service {WorldCatMetadataAPI}" in the "div#error_content > p#message" element
        And I should see "Authorization header: Bearer tk_12345" in the "div#error_content > p#detail" element  
        
      Scenario: Unsuccessfully View Bib - Unknown OCLC Number
        When I am on "/bib/404"
        Then I should see "System Error" in the "div#content > h1" element
        And I should see "Status - 404" in the "div#error_content > p#status" element
        And I should see "Unable to locate resource: 404." in the "div#error_content > p#message" element
    ```
#### Running Tests
1. Start the built-in node server with the test configuration
```bash
$ npm run-script test_server
```
2. Run tests
```bash
$ npm run-script cucumber_tests
```

**[on to Part 14](tutorial-14.md)**

**[back to Part 12](tutorial-12.md)**