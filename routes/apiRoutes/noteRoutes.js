const { createNewNote, validateNote } = require ('../../lib/notes');
const { notes } = require ('../../data/db');

app.get('/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
});

app.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is note properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
    
        res.json(note);
    }
});
