# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 6 - Framework fundementals

#### Configuration
1. In project root create file prod_config.yml
2. Edit prod_config.yml so it contains a set of key value pairs with:
    - wskey key
    - wskey secret
    - principalID
    - principalIDNS
    - institution registry ID
	
```
wskey: test
secret: secret
principalID: id 
principalIDNS: namespace
institution: 128807
```

#### Creating the Application Entry point
1. Create a file called server.js
2. Open server.js
3. Load dependencies
```
"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const nodeauth = require("nodeauth");

const Bib = require("./bib.js")
const BibError = require("./BibError.js")

const isLambda = !!(process.env.LAMBDA_TASK_ROOT || false);

```

4. Configure the application
    1. use ejs to render html templates
    2. set directory where views are stored to views
    
```
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', 'views'); 
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

module.exports = app;
```

#### Create code to load configuration information
1. In src folder create a file called config.js
2. Open config.js
    1. Create a function that loads the configuration data file as a string based on the environment
    
    ```
    "use strict";
    const fs = require('fs');

    module.exports = function get_config(environment) {
        let config = fs.readFileSync(require('path').resolve(__dirname, '../' + environment + '_config.yml')).toString();
        return config;
    };        
    ```

#### Create local configuration for running application
1. In project root create a file called local.js
2. Open local.js
    1. Require yaml parsing library 
    2. Require src/config.js
    3. Set the environment
    4. Load the configuration 
    5. Require src/server.js
    3. Tell application what port to run on
    4. Log what application is doing

```
const yaml = require('js-yaml');
const get_config = require("./src/config.js");
let environment = 'prod';
global.config = yaml.load(get_config(environment));
let app = require('./src/server.js');
let port = process.env.PORT || 8000;

// Server
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});
        
```

#### Add script for starting app to package.json
1. Open package.json
2. In scripts section add

```
"start": "nodemon local.js",
```

#### Application Authentication
Authentication happens repeatedly in our application so we want to create a reusable function to handle Authentication when we need it. To do this we're using something called a "Middleware".
The idea behind middleware is to allow us to intercept any request and tell the application to do something before and/or application request. 
In this case we're the application that anytime this function is called it should perform authentication BEFORE the client request.

1. Open server.js
2. Add authentication setup
    1. instantiate user and wskey objects
    2. create access token variable
    

```

const options = {
    services: ["WorldCatMetadataAPI"]
};

const user = new nodeauth.User(config['institution'], config['principalID'], config['principalIDNS']);
const wskey = new nodeauth.Wskey(config['wskey'], config['secret'], options);

this.accessToken = null;
```

3. Create a variable called autheMiddleware to hold the middleware which performs authentication.

```
let autheMiddleware = express.Router()
```

4. Create a function will take req, res, and next parameters that will deal with the HTTP post bib route
```
autheMiddleware.post('/bib', function (req, res, next) {
    getAccessToken(req, res, next);
});
```
     
5. Create a function will take req, res, and next parameters that will deal with the HTTP GET bib/id route
```
autheMiddleware.post('/bib/:id', function (req, res, next) {
    getAccessToken(req, res, next);
});

6. Create a function that retrieve an Access token
    1. Check for an existing valid Access Token if present go on your way
    2. If no valid Access Token, take the existing wskey object in your container and use the getAccessTokenWithClientCredentials method passing in:
    - institution from your config file as authenticating institution
    - institution from your config file as context institution
    - user variable as the user
    3. If an Access Token is retrieved 
        1. set it to the context.accessToken variable
        2. continue on the way
    4. if no access token can be retrieved, show error screen     
    
```   
function getAccessToken (req, res, next){ 
    if (context.accessToken && context.accessToken.getAccessTokenString()){
        next()
    }else {
        // request an Access Token
        wskey.getAccessTokenWithClientCredentials(config['institution'], config['institution'], user)
            .then(function (accessToken) {
                context.accessToken = accessToken;
                next();
            })
            .catch(function (err) {
                //catch the error with the error template
            })
    }   
}
```


**[on to Part 7](tutorial-07.md)**

**[back to Part 5](tutorial-05.md)**