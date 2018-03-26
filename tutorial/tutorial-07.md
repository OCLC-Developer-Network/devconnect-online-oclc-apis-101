# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 7 - Route Basics

#### Routes - Telling the App what to do
Our application is supposed to have two "screens":
- Search box
- Display screen for a bibliographic record
To make our application work we have to tell it what urls to use for those two screens. This requires a routes.php file

1. Open the server.js file
2. Define the route for the search screen
    - Add the HTTP method which will be used
    - Add the "path"
    - Return the view you want the application to display in the response
    - Set the action for the form

```
app.get('/', (req, res) => {   
   if (isLambda) {
       var action = "production/bib";
   } else {
       var action = "bib";
   }
   
   res.render('index', {action: action});   
});
```
4. Define a basic routes for the screen to display a bibliographic record

```
app.post('/bib', (req, res) => {
    var id = req.body.oclcnumber;
    res.render('display-bib'); 
});
```

```
app.get('/bib/:id', (req, res) => {
    var id = req.params['id'];
    
    res.render('display-bib');

});
```

**[on to Part 8](tutorial-08.md)**

**[back to Part 6](tutorial-06.md)**