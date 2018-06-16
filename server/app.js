
// loading the module
const express = require('express')
const app = express()

// body parser for parsing JSON
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// importing the note class from note.js file
const Note = require('./notes')

let notes = []

// middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

//GET method
app.get('/notes',function(req,res){
  res.json(notes)

})

//POST method
app.post('/notes',function(req,res){
  let note = new Note(req.body.title, req.body.priority)
  notes.push(note)
  res.json(notes)

})

//PUT method
app.put('/notes',function(req,res){
// not working as intended ???
  notes.forEach((note)=>{
    if(note.unique == req.body.unique){
      note.toggleNote()
    }
  })
  res.json(notes)

})

//DELETE method
app.delete('/notes',function(req,res){
  for(index in notes){
    if(notes[index].unique == req.body.unique){
      indexToRemove = index
    }
  }
  notes.splice(indexToRemove, 1)
  res.json(notes)

})

//fire it up
app.listen(3000, () => console.log('Example app listening on port 3000!'))
