const apiRouter = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { writeToFile, deleteNote} = require('../helpers/fsUtils');
const { notes } = require('../db/db.json');

apiRouter.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

apiRouter.post('/notes', (req, res) => {
    const addedNote = req.body;
    addedNote.id = uuidv4();
    let note = writeToFile(addedNote, notes);
    res.json(note);
})

apiRouter.delete('/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})


module.exports = apiRouter;