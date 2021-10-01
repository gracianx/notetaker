const router = require('express').Router();
const notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');


router.get('/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), "utf8"));
    return res.json(data);
});


router.post('/notes', (req, res) => {
    // add unique id to each post
    req.body.id = Date.now();
    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes));
    res.json("Note saved!");
});


router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id;
    console.log(noteId);
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), "utf8"));
    console.log(data);
    data = data.filter(note => note.id != noteId)
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(data));
    res.json(data);
});

module.exports = router;
