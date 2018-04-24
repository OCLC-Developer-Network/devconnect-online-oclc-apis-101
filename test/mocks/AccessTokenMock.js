const nodeauth = require("nodeauth");

module.exports = Object.assign(new nodeauth.AccessToken, {
	  grantType: 'authorization_code',
	  wskey: {
	     key: 'key',
	     secret: 'secret',
	     services: [ 'SCIM:read_self', 'refresh_token' ],
	     redirectUri: 'http://localhost:8000/myaccount',
	     user: {
	        principalID: '1671151d-ac48-4b4d-a204-c858c3bf5d86',
	        principalIDNS: 'urn:oclc:platform:128807',
	        authenticatingInstitutionId: '128807' },
	     bodyHash: '',
	     error: null,
	     signedRequest: 'MjwDmFLfCLdjx5oBx5du/CWWek5Q4vifG61h8ZsPf/U=' },
	  scope: undefined,
	  user: {
	     principalID: '1671151d-ac48-4b4d-a204-c858c3bf5d86',
	     principalIDNS: 'urn:oclc:platform:128807',
	     authenticatingInstitutionId: '128807' },
	  contextInstitutionId: '128807',
	  authenticatingInstitutionId: 128807,
	  redirectUri: 'http://localhost:8000/myaccount',
	  code: 'auth_12345678',
	  refreshToken: {
	     refreshToken: 'rt_123456',
	     expiresIn: 604799,
	     expiresAt: '2028-04-24 21:06:00Z' },
	  accessTokenString: 'tk_123456',
	  expiresAt: '2028-04-17 21:21:00Z',
	  services: undefined,
	  accessTokenUrl: 'https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=authorization_code&code=auth_12345678&authenticatingInstitutionId=128807&contextInstitutionId=128807&redirect_uri=http://localhost:8000/myaccount',
	  errorCode: null,
	  tokenType: 'bearer',
	  expiresIn: 899 
  });