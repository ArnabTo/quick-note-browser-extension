// Select DOM elements
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveNoteButton = document.getElementById('saveNote');
const notesList = document.getElementById('notesList');

// Utility function to retrieve notes from localStorage
function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Utility function to save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to render notes in the UI
function renderNotes() {
    notesList.innerHTML = ''; // Clear the list first
    const notes = getNotes();

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note-item');
        noteDiv.setAttribute('data-index', index);

        noteDiv.innerHTML = `
     <div class='note-item-content'>
      <h2>${index + 1}.</h2>
      <h2>${note.title}</h2>
      </div>
            <p>${note.content}</p>
     <div class='note-actions'>
      <button class="button edit-note">Edit</button>
      <button class="button delete-note">Delete</button>
     </div>
    `;

        notesList.appendChild(noteDiv);
    });

    attachEventListeners();
}

// Function to add a new note
function addNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title || !content) {
        alert('Please fill in both the title and content fields.');
        return;
    }

    const notes = getNotes();
    notes.push({ title, content });
    saveNotes(notes);

    noteTitle.value = '';
    noteContent.value = '';
    renderNotes();
}

// Function to edit a note
function editNote(index) {
    const notes = getNotes();
    const note = notes[index];

    // Pre-fill the input fields with the existing note data
    noteTitle.value = note.title;
    noteContent.value = note.content;

    // Temporarily change the save button to update the note
    saveNoteButton.textContent = 'Update Note';
    saveNoteButton.onclick = () => {
        updateNote(index);
    };
}

// Function to update an existing note
function updateNote(index) {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title || !content) {
        alert('Please fill in both the title and content fields.');
        return;
    }

    const notes = getNotes();
    notes[index] = { title, content };
    saveNotes(notes);

    noteTitle.value = '';
    noteContent.value = '';
    saveNoteButton.textContent = 'Add Note';
    saveNoteButton.onclick = addNote;

    renderNotes();
}

// Function to delete a note
function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1); // Remove the note at the specified index
    saveNotes(notes);
    renderNotes();
}

// Attach event listeners to edit and delete buttons
function attachEventListeners() {
    const editButtons = document.querySelectorAll('.edit-note');
    const deleteButtons = document.querySelectorAll('.delete-note');

    editButtons.forEach((button, index) => {
        button.onclick = () => editNote(index);
    });

    deleteButtons.forEach((button, index) => {
        button.onclick = () => deleteNote(index);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderNotes(); // Render notes on page load
});

saveNoteButton.onclick = addNote;
