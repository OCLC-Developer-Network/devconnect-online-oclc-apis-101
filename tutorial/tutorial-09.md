# A Beginner's Guide to Working with OCLC APIs
## OCLC DEVCONNECT 2018: Pre-Conference Workshop
### Tutorial Part 9 - Route using a Model 

#### Displaying the Bibliographic Record
In order to display the actual bibliographic data we have to retrieve it from the API and pass it to our view.
1. Open server.js
2. Find HTTP GET bib route
```
app.get('/bib/:id', (req, res) => {
```
3. Remove line
```
res.render('display-bib'); 
``` 
4. Use the Bib class to find the record

```
    var id = req.params['id'];
    Bib.find(id, app.get('accessToken').getAccessTokenString())
        .then(bib => {
            bib.getRecordAsString()
            .then(function (output){
                res.render('display-bib', {bib: bib, recordAsString: output});
            })
            .catch(function (err){
                // catch the error
            })
        })
        .catch (error => {
            // catch the error
        })
```

5. Find the Find HTTP POST bib route
```
app.post('/bib', (req, res) => {
```

6. Remove line
```
res.render('display-bib'); 
``` 

7. Use the Bib class to find the record

```
    var id = req.body.oclcnumber;
    Bib.find(id, app.get('accessToken').getAccessTokenString())
        .then(bib => {
            bib.getRecordAsString()
            .then(function (output){
                res.render('display-bib', {bib: bib, recordAsString: output});
            })
            .catch(function (err){
                // catch the error
            })
        })
        .catch (error => {
            // catch the error
        })
```

**[on to Part 10](tutorial-10.md)**

**[back to Part 8](tutorial-08.md)**