const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const db = require('./db/db.json');


console.log(db)


const obj = {
  notes: []
}

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTER

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => res.json(db.notes));


app.post('/api/notes', (req, res) => {
  let dbLength = db.notes.length
  
  const newNote = {
    'id': dbLength + 1,
    'title': req.body.title,
    'text': req.body.text
  };

  db.notes.push(newNote);
  
  console.log(req.body);
  
  res.json(req.body);
  
  fs.readFile('../db/db.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    dbObj = JSON.parse(data); //now it an object
    console.log(JSON.parse(data))
    dbObj.notes.push(newNote); //add some data
     //convert it back to json
    fs.writeFile('../db/db.json', JSON.stringify(dbObj), (err) => {
      if (err) throw err;
      console.log('The file has been saved!')}); // write it back
      // readDB() 
     
     
}});
});


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});