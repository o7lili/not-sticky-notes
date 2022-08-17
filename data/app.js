const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

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
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) throw new Error('must have title and text'); 

        const newNote = {title, text, id:uuid()};
        return this.getNotes()
        .then(notes => {
            ([...notes, newNote])
            .then(updatedNotes => {
                this.write(updatedNotes).then(() => {
                    return (newNote);
                })
            });
        });
    }
    
};

module.exports = new Notebook();