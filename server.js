var fs = require("fs");
var express = require("express");
var path = require("path");
var notes = [];

var app = express();
var PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

//HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/db/db.json"));
  });

  
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
  });



  app.post("/api/notes", function(req, res) {
    const userNote = req.body
    const data = fs.readFileSync(__dirname + '/Develop/db/db.json')
    const product = JSON.parse(data)
    userNote.id = product.length + 1;
    product.push(userNote)
        fs.writeFile(__dirname + "/Develop/db/db.json", JSON.stringify(product), "utf-8", function(err){
            if (err) throw err
            console.log("success");
        })
  
    res.json(userNote);
  });
  
  // Starts the server to begin listening
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });