const router = require('express').Router();
const noteBook = require ('../../data/app.js');
router.get('/notes', (req, res) => {
    noteBook.getNotes()
    .then((notes) => {
            console.log('line 8', JSON.stringify(notes));
           return res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});
router.post('/notes', (req, res) => {
    console.log(req.body)
    noteBook.addNote(req.body)
        .then((note) => {
            return res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })

    // set id based on what the next index of the array will be
    // req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    // if (!validateNote(req.body)) {
    //     res.status(400).send('The note is note properly formatted.');
    // } else {
    //     // add note to json file and notes array in this function
    //     const note = createNewNote(req.body, notes);
    
    //     res.json(note);
    // }
});


module.exports = router;