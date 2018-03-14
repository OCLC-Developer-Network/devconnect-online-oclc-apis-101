module.exports = Object.assign(new Error, {
    "config": {
        "transformRequest": {},
        "transformResponse": {},
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {"Accept": "application/json, text/plain, */*"},
        "method": "get",
        "url": "https://worldcat.org/bib/data/12345"
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
            "url": "https://worldcat.org/bib/data/12345"
        },
        "data": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<error>\n<code type=\"http\">401<\/code>\n<message>AccessToken {tk_12345} is invalid<\/message>\n<detail>Authorization header: Bearer tk_12345<\/detail>\n<\/error>",
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
                "method": "get",
                "url": "https://worldcat.org/bib/data/12345"
            },
            "headers": {"Accept": "application/json, text/plain, */*"},
            "url": "https://worldcat.org/bib/data/12345",
            "timeout": 0,
            "withCredentials": false
        }
    }
});