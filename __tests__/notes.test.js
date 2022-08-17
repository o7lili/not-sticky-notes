const fs = require('fs');
const {
    createNewNote,
    validateNote,
} = require('../lib/notes.js');
const { notes } = require("../data/db");

jest.mock('fs');

test("creates a note object", () => {
    const note = createNewNote(
        { title: "bills", id: "jhgdja3ng2" },
        notes
    );

    expect(note.title).toBe("bills");
    expect(note.id).toBe("jhgdja3ng2");
});

test("validates note", () => {
    const note = {
        id: "8",
        title: "top 3 movies",
        text: "burnt, the devil wears prada, easy A",
    };

    const invalidNote = {
        id: "8",
        title: "top 3 movies",
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});