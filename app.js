const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const vars = {
	title: {
		describe: 'Title of note',
		demand: true,
		alias: 't'
	},
	body: {
		describe: 'Body of note',
		demand: true,
		alias: 'b'
	}
}
const argv = yargs
	.command('add', 'Add a new note', {
		title: vars.title,
		body: vars.body			
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title: vars.title
	})
	.command('remove', 'remove a note', {
		title: vars.title
	})
	.help()
	.argv;
var command = argv._[0];


if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note added')
		notes.logNote(note);
		debugger;
	} else {
		console.log('Note not added')
	}
} else if ( command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.map( note => notes.logNote(note))

} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note found')
		notes.logNote(note);
	} else {
		console.log('Note not found')
	}
} else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? "Removed note" : "Not not removed";
	console.log(message);
} else {
	console.log('command not recognized')
}