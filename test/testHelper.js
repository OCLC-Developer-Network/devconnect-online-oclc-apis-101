const accessToken = require('./mocks/AccessTokenMock');
const fs = require('fs');
const yaml = require('js-yaml');

global.config = yaml.load(fs.readFileSync(require('path').resolve(__dirname, '../test_config.yml')).toString());
let app = require('../src/server');
app.set('accessToken', accessToken)

exports.moxios = require('moxios');
exports.nock = require('nock');
exports.bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bibResponse.xml')).toString();
exports.error_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse.xml')).toString();
exports.error_response_403 = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse_403.xml')).toString();
exports.error_response_404 = fs.readFileSync(require('path').resolve(__dirname, './mocks/errorResponse_404.xml')).toString();
exports.access_token_error = fs.readFileSync(require('path').resolve(__dirname, './mocks/access_token_error.json')).toString();
exports.app = app;