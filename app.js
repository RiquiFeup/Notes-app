let notes =[];
let editingNoteId = null

function loadNotes(){
    const savedNotes= localStorage.getItem('quickNotes')
    return savedNotes? JSON.parse(savedNotes) : []
}
function saveNote(event){
    event.preventDefault()

    const title= document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    if(editingNoteId){
        // Update existing Node

        const noteIndex= notes.findIndex(note => note.id === editingNoteId)
        notes[noteIndex] = {
            ...notes[noteIndex],
            title : title,
            content : content
        }
    }else{
        // Add New Note
        notes.unshift({
        id: generateID(),
        title: title,
        content:content
        })
    }

   

    closeNoteDialog()
    saveNotes()
    renderNotes()
}

function deleteNote(noteId){
    notes = notes.filter(note => note.id != noteId)
    saveNotes()
    renderNotes()
}

function generateID(){
    return Date.now().toString()
}

function openNoteDialog(noteId = null){
    const dialog = document.getElementById('noteDialog');
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');

    if(noteId){
        //Edit Mode
        const noteToEdit = notes.find(note => note.id === noteId)
        editingNoteId = noteId
        document.getElementById('dialogTitle').textContent = 'Edit Note'
        titleInput.value = noteToEdit.title
        contentInput.value = noteToEdit.content
    }else{
        // Add Mode
        editingNoteId = null
        document.getElementById('dialogTitle').textContent = 'Add New Note'
        titleInput.value = ''
        contentInput.value = ''
    }
    dialog.showModal()
    titleInput.focus()
}

function renderNotes(){
    const notesContainer = document.getElementById('notesContainer');

    if(notes.length === 0){
        notesContainer.innerHTML = `
            <div class="empty-state">
                <h2>No notes yet</h2>
                <p>Create your first note to get started!</p>
                <button class="add-note-btn" onclick="openNoteDialog()">
                    + Add your first Note
                </button>
            </div>`
            return
    }
    notesContainer.innerHTML = notes.map(note => `
        <div class = "note-card">
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>
            <div class = "note-actions">
                <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                    </svg>
                </button>
                <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                    </svg>
                </button>
            </div>

        </div>
        `).join('')
    
}

function saveNotes(){
    localStorage.setItem('quickNotes', JSON.stringify(notes))
}
function closeNoteDialog(){
    document.getElementById('noteDialog').close();
}
function toggleTheme(){
    const isDark= document.body.classList.toggle('dark-theme')
    localStorage.setItem('theme', isDark ? 'dark': 'light')
    document.getElementById('themeToggleBtn').textContent= isDark ? '☀️':'🌙'

}

function applyStoredTheme(){
    if(localStorage.getItem('theme') === 'dark' ){
        document.body.classList.add('dark-theme')
        document.getElementById('themeToggleBtn').textContent= '☀️'
    }
}
document.addEventListener('DOMContentLoaded', function(){
    applyStoredTheme()
    notes= loadNotes()
    renderNotes()

    document.getElementById('noteForm').addEventListener('submit', saveNote)
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme)

    document.getElementById('noteDialog').addEventListener('click', function(event){
        if(event.target === this){
            closeNoteDialog()
        }
    })
})