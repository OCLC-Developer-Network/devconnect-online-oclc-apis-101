DEVCONNECT Online 2018 - Introductory Application
=============
This is a demonstration application written to how to interact with OCLC web service in Node.js. It uses best programming practices like 
- dependency management
- object-oriented programming
- model view controller (MVC) code structures
- unit testing
- behavior driven functional testing
- continous integration 

## Installation

### Step 1: Install from GitHub

In a Terminal Window

```bash
$ cd {yourGitHomeDirectory}
$ git clone https://github.com/OCLC-Developer-Network/devconnect-online-oclc-apis-101.git
$ cd devconnect2018precon
```

### Step 2: Use npm to install the dependencies

```bash
$ npm install
```

### Step 3: Configure your environment file with your WSKey/secret and other info

```bash
$ cp test_config.yml prod_config.yml
$ vi prod_config.yml
```

Edit the following values
- wskey
- secret
- principalID
- principalIDNS
- institution

```
aws kms encrypt --key-id {kms_key_id} --plaintext fileb://prod_config.yml --output text --query CiphertextBlob --output text | base64 -D > prod_config_encrypted.txt

```

## Usage

### Start the built-in web server
```bash
$ npm start
```
### View the application
Point your web browser at the localhost address where these instructions will install it by default. 

[http://localhost:8000](http://localhost:8000)

## Running Tests

### Unit Tests
From the command line run

```bash
$ npm tests
```

### Behavior Driven Functional Tests

#### Start the built-in server
```bash
$ npm run test_server
```

#### Run tests
```bash
$ npm run cucumber_tests 
```

## How this was built

For a step by step tutorial on this application see the [tutorial section](https://github.com/OCLC-Developer-Network/devconnect2018precon/tree/master/tutorial)

