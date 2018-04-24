# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 15 - Host your code on AWS Lambda

#### Get AWS Credentials

#### Encrypt your credentials
1. Create a KMS key in AWS - https://console.aws.amazon.com/iam
    1. Use the encryption keys link
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
const app = require('./src/server');
const server = awsServerlessExpress.createServer(app)


module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);
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
 runtime: nodejs6.10
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

**[back to Part 14](tutorial-14.md)**