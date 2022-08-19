const fs = require('fs');
const util = require('util');
const { v4 : uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Notebook {
    read() {
        return readFileAsync('data/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('data/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes = [].concat(JSON.parse(notes));
            return parsedNotes;
        });
    }
    addNote(note) {
        const newNote = {title:note.title, text:note.text, id:uuidv4()};
        return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => (newNote))
    };

    deleteNote(note) {
        // delete all notes code here
    }
};

module.exports = new Notebook();