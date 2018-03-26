# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 8 - Views
Views govern how content will be displayed on the screen. 
Data can be passed into a view for display purposes. More on this later.

#### Create a basic layout for your views
1. In the views directory create header.html

```
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Bib Record demo</title>
</head>
<body>
```

2. In the views directory create footer.html
```
</body>
</html>
```


#### Create search form view
1. In views directory create file index.html

```
<%- include('header.html') -%>
<form action="<%= action %>" method="POST">
    <p><label>OCLC Number:</label> <input type="text" name="oclcnumber" /></p>
    </p>
    <input type="submit" value="Search" />
</form>
<%- include('footer.html') -%>
```

#### Create base bib view
1. In views directory create file display-bib.html

```
<%- include('header.html') -%>
<h1></h1>
<div id="record">
<h4>Raw MARC</h4>
<div id="raw_record">
<pre>
</pre>
</div>
</div>
<%- include('footer.html') -%>
```


**[on to Part 9](tutorial-09.md)**

**[back to Part 7](tutorial-07.md)**