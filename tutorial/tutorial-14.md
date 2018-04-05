# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 14 - Continous Integration

1. Create a file called .travis.yml
2. Open file and add configuration information
	1. language code is in
	2. versions of node.js to test against
	3. install commands
	4. commands to run before script
	5. script(s) to run for test purposes
	6. notifications configuration

```
sudo: required
language: node_js
node_js: "8"

cache:
  directories:
- node_modules

install:
  - npm install -g npm
  - npm install

before_script:
  - npm run-script test_server &
  - sleep 2

script:
  - npm test
  - npm run cucumber_tests

# configure notifications (email, IRC, campfire etc)
notifications:
    email:
        recipients:
        - coombsk@oclc.org
        on_success: always
        on_failure: always
```
3. Turn your project on in Travis-CI
    1. Login with a Github login
    2. Add a new repository
        1. Choose from your Github repositories
    3. Configure settings
        1. when to run builds
        2. Environment variables
    4. Activate

**[on to Part 15](tutorial-15.md)**

**[back to Part 13](tutorial-13.md)**