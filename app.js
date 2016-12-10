const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
  describe: 'title of note',
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('List', 'List all notes')
  .command('Read', 'Read a note', {
    title: titleOptions
  })
  .command('Remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv
var command = argv._[0];

if (command === 'add')
{
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note Title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));

} else if (command === "read") {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note does not exist')
  }
} else if (command === "remove") {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('ERROR 404');
}
