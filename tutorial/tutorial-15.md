# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 15 - Host your code on AWS Lambda

#### Get AWS Credentials

#### Encrypt your credentials
1. Create a KMS key in AWS - https://console.aws.amazon.com/iam
    1. Use the encryption keys link
    2. Create a new key
2. Copy your KMS key
3. Encrypt your yml file with AWS commandline tools
    - make sure you are in the root project directory

```bash
aws kms encrypt --key-id {kms_key_id} --plaintext fileb://prod_config.yml --output text --query CiphertextBlob --output text | base64 -D > prod_config_encrypted.txt

aws kms encrypt --key-id {kms_key_id} --plaintext fileb://test_config.yml --output text --query CiphertextBlob --output text | base64 -D > test_config_encrypted.txt
```

2. Exclude encrypted config file from version control.
 1. Open `.gitignore` in your text editor.
 2. Add a line
 ```
    prod_config_encrypted.txt
 ```

3. Change the Authentication code to use encrypted credentials
    1. Open src/config.js
    2. Add line 
    ```
    const AWS = require('aws-sdk');
    ```
    
    3. Replace line
        ```
        return yaml.load(fs.readFileSync(require('path').resolve(__dirname, '../' + environment + '_config.yml')).toString());
        ```
    4. With
    ```
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
    ```

#### Get Serverless working
1. In the project root create a files named lambda.js
2. Open lambda.js and add the following
```
const awsServerlessExpress = require('aws-serverless-express');
const yaml = require('js-yaml');
const get_config = require("./src/config.js");
let environment = 'prod';

global.config = "";

module.exports.universal = function(event, context){
    get_config('prod')
    .then(function (output){
        global.config = yaml.load(output);
        let app = require('./src/server.js');       
        const server = awsServerlessExpress.createServer(app)
        return awsServerlessExpress.proxy(server, event, context);
    })
    .catch(function (err){
        throw ('Config failed to load' + err);
    });
}
```

2. Create a serverless.yml file

```
service: devnetconnect-workshop-node-app

package:
  exclude:
    - config.yml
    - test_config.yml
    - test_config_encrypted.yml
    - local.js
    - .gitignore
    - .git/**
provider:
 name: aws
 runtime: nodejs8.10
 memorySize: 128
 timeout: 10
 stage: production
 region: us-east-1

functions:
 api:
   handler: lambda.universal
   events:
     - http: ANY {proxy+}
     - http: ANY /
```

3. Add a deploy script to your package.json
```
    "deploy": "serverless deploy",
```

4. Deploy your code
```bash
npm deploy
```
Make sure you note the URL for where the application is deployed

5. Ensure the role running the Lambda can access decryption key
    1. Go into the AWS Console - Lambda (https://console.aws.amazon.com/lambda)
    2. Find the Execution role - likely named devconnect-demo-node-app-production
    3. Go to the AWS Console - IAM (https://console.aws.amazon.com/iam)
    4. Choose Roles
    5. Choose the name of the execution role
    6. Edit policy
    7. Add permissions
    - Read (all actions)
    - List - ListKeys
    - Write - Decrypt
    8. Save
6. Go to the url and view the deployed application
     

**[back to Part 14](tutorial-14.md)**