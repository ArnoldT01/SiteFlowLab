if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../login.html";
}

const savedNotesContainerDiv = document.getElementById('savedNotesContainer');
const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');

let editingIndex = -1;

window.onload = function() {
    loadNotes();
};

function saveNote() {
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (editingIndex === -1) {
        notes.push(noteText);
    } else {
        notes[editingIndex] = noteText;
        editingIndex = -1;
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';

    displayNotes();
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotesContainerDiv.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = note;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editNote(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(index);

        noteDiv.appendChild(editButton);
        noteDiv.appendChild(deleteButton);
        savedNotesContainerDiv.appendChild(noteDiv);
    });
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteInput.value = notes[index];
    editingIndex = index;
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    loadNotes();
}

function clearNotes() {
    localStorage.removeItem('notes');
    savedNotesContainerDiv.innerHTML = '';
}

saveButton.addEventListener('click', saveNote);
clearButton.addEventListener('click', clearNotes);