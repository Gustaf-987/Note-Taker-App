var fs = require("fs");
var express = require("express");
var path = require("path");
var notes = [];

var app = express();
var PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
  });
  
  // Displays all characters
  app.get("/api/notes", function(req, res) {
    return res.json(characters);
  });
  
  // Displays a single character, or returns false
  app.get("/api/notes/:notes", function(req, res) {
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].routeName) {
        return res.json(characters[i]);
      }
    }
  
    return res.json(false);
  });

  app.post("/api/notes", function(req, res) {
    let newNote = req.body
    let rawData = fs.readFileSync('/Develop/db/db.json')
    let result = JSON.parse(rawData)
  
    result.push(newNote)
    console.log(result);
    res.json(result);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on http://localhost: " + PORT);
  });