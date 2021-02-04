var fs = require("fs");
var express = require("express");
var path = require("path");
var notes = [];
var util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

var app = express();
var PORT = process.env.port || 3004;

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

//Function to POST notes to DB
app.post("/api/notes", function(req, res) {
    const userNote = req.body
    const data = fs.readFileSync(__dirname + '/Develop/db/db.json')
    const product = JSON.parse(data)
    userNote.id = product.length + 1;
    product.push(userNote)
    fs.writeFile(__dirname + "/Develop/db/db.json", JSON.stringify(product), "utf-8", function(err) {
        if (err) throw err
        console.log("success");
    })

    res.json(userNote);
});

app.delete("/api/notes/:id", function(req, res) {
    const remove = parseInt(req.params.id);
    readFileAsync(__dirname + "/Develop/db/db.json", "utf-8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = [];
        for (let i = 0; i < notes.length; i++) {
            if (remove !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.send("saved");
    })

})

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});