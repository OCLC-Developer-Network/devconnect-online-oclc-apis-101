const nodeauth = require("nodeauth");

module.exports = Object.assign(new nodeauth.AccessToken, {
	  grantType: 'client_credentials',
	  wskey: {
	     key: 'key',
	     secret: 'secret',
	     services: [ 'WorldCatMetadataAPI'],
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
	  accessTokenString: 'tk_123456',
	  expiresAt: '2028-04-17 21:21:00Z',
	  services: undefined,
	  accessTokenUrl: 'https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=client_credentials&&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=WorldCatMetadataAPI',
	  errorCode: null,
	  tokenType: 'bearer',
	  expiresIn: 899 
  });