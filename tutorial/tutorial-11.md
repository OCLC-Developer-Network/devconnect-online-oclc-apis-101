# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 11 - Catching Errors

#### Displaying an error message for the user
1. Open server.js
2. Find the HTTP GET bib display route
3. When a request doesn't return a Bib, return the Error view. Pass it the following variables:
- error
- error_message
- error_detail
- oclcnumber
```
    res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail(), oclcnumber: id});
```

4. Find the HTTP POST bib display route add the same code
5. Create file views/display-error.html
```
<%- include('header.html') -%>
    <h1>System Error</h1>
    <div id="error_content">
    <p id="status">Status - <%=error%></p>
    <% if (error_message) { %>
    <p id="message">Message - <%=error_message%></p>
    <% }; %>
    <% if (error_detail) { %>
    <p id="detail"><%=error_detail%></p>
    <% }; %>
    <% if (oclcnumber) { %>
    <p id="oclcnumber">OCLC Number - <%=oclcnumber%></p>
    <% }; %>
    </div>
<%- include('footer.html') -%>

```

#### Handle authentication errors
1. Open server.js
2. Add error template to the catch block

```
    let error = new Error(err);
    res.render('display-error', {error: error.getCode(), error_message: error.getMessage(), error_detail: error.getDetail()});
```

**[on to Part 12](tutorial-12.md)**

**[back to Part 10](tutorial-10.md)**