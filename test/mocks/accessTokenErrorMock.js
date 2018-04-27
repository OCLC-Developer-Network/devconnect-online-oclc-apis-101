module.exports = Object.assign(new Error, {
    "config": {
        "transformRequest": {},
        "transformResponse": {},
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {"Accept": "application/json, text/plain, */*"},
        "method": "post",
        "url": "https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=client_credentials&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=SCIM:read_self"
    },
    "response": {
        "config": {
            "transformRequest": {},
            "transformResponse": {},
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {"Accept": "application/json, text/plain, */*"},
            "method": "get",
            "url": "https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=client_credentials&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=SCIM:read_self"
        },
        "data": {"code": {"type": "http","value": "401"},"details": "Authorization header: http://www.worldcat.org/wskey/v2/hmac/v1 clientId=\"test\", timestamp=\"1524513365\", nonce=\"a2b79385\", signature=\"yS+aKqSbJ2PjL9S5AuA5zqo+t2QfWLl8W9wWbACnFMk=\", principalID=\"id\", principalIDNS=\"namespace\"","message": "WSKey 'test' is invalid"},
        "status": 401,
        "request": {
            "config": {
                "transformRequest": {},
                "transformResponse": {},
                "timeout": 0,
                "xsrfCookieName": "XSRF-TOKEN",
                "xsrfHeaderName": "X-XSRF-TOKEN",
                "maxContentLength": -1,
                "headers": {"Accept": "application/json, text/plain, */*"},
                "method": "post",
                "url": "https://authn.sd00.worldcat.org/oauth2/accessToken?grant_type=client_credentials&authenticatingInstitutionId=128807&contextInstitutionId=128807&scope=SCIM:read_self"
            },
            "headers": {"Accept": "application/json, text/plain, */*"},
            "url": "https://128807.share.worldcat.org/idaas/scim/v2/Me",
            "timeout": 0,
            "withCredentials": false
        }
    }
});