# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 10 - Dynamic Views
Views can be use content to be dynamically generated. Data is passed into the view via an associative array.
The key of the array is the name of the variable in the view.

Example:
```
res.render('display-bib', {bib: bib, recordAsString: output});
```
#### Make the Bib View Dynamic

1. Open display-bib.html
2. Use bib and recordAsString variables passed from route and Bib object methods to fill in fields in display-bib.html
- bib.getTitle()

```
<%- include('header.html') -%>
<h1><%= bib.getTitle() %></h1>
<div id="record">
<h4>Raw MARC</h4>
<div id="raw_record">
<pre>
<%= recordAsString %>
</pre>
</div>
</div>
<%- include('footer.html') -%>
```

**[on to Part 11](tutorial-11.md)**

**[back to Part 9](tutorial-09.md)**