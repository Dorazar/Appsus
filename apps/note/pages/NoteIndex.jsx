import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteNav } from '../cmps/NoteNav.jsx'

const { useEffect, useState } = React
const { Outlet, useLocation, useNavigate } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        loadNotes()
    }, [location])

    function loadNotes() {
        noteService.query().then((notes) => setNotes(notes))
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                // showSuccessMsg('Note Removed Successfully!')
                setNotes((prevNotes) =>
                    prevNotes.filter(note => note.id !== noteId)
                )
            })
            .catch(err => {
                console.log(err)
                // showErrorMsg('Problem removing note')
            })
    }

    function onSetNotesStyle(noteId, newBackgroundColor) {
        const noteToUpdate = notes.find(note => note.id === noteId)
        if (!noteToUpdate) return

        const updatedNote = {
            ...noteToUpdate,
            style: {
                ...((noteToUpdate.style || {}), { backgroundColor: newBackgroundColor })
            }
        }

        noteService.save(updatedNote)
            .then(() => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === noteId ? updatedNote : note
                    )
                )
                // showSuccessMsg('Note Style Changed Successfully!')
            })
            .catch(err => {
                console.log('Error saving note style:', err)
                // showErrorMsg('Problem changing note style')
            })
    }

    function onPinNote(noteId) {

        const noteToUpdate = notes.find(note => note.id === noteId)
        if (!noteToUpdate) return

        const updatedNote = {
            ...noteToUpdate,
            isPinned: !noteToUpdate.isPinned
        }

        noteService.save(updatedNote)
            .then(() => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === noteId ? updatedNote : note
                    )
                )
                // showSuccessMsg('Note Style Changed Successfully!')
            })
            .catch(err => {
                console.log('Error saving note style:', err)
                // showErrorMsg('Problem changing note style')
            })
    }

    function onAddNote(newNote) {
        noteService.save(newNote)
            .then(savedNote => {
                setNotes(prev => [...prev, savedNote])
            })
            .catch(err => {
                console.log('Cannot save note:', err)
                // showErrorMsg('Cannot save note')
            })

    }

    function onDuplicateNote(noteId) {
        const note = notes.find(note => note.id === noteId)

        if (!note) return

        const noteToDuplicate = {
            ...note,
            id: '',
            createdAt: Date.now(),
            isPinned: false
        }

        noteService.save(noteToDuplicate)
            .then(noteToDuplicate => {
                setNotes(prev => [...prev, noteToDuplicate])
                // showSuccessMsg('Note Duplicated Successfully!')
            })
            .catch(err => {
                console.log('Error duplicating note:', err)
                // showErrorMsg('Problem Duplicated note')
            })

    }


    if (!notes || notes.length === 0) return <div>Loading...</div>

    return (

        <div className="main-notes-layout">
            <NoteHeader>
                <form onClick={() => navigate('/note/search')}
                    className="note-filter"
                >
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                    />

                </form>
            </NoteHeader>


            <div className="layout-container">

                <NoteNav />

                <section className="notes-container">
                    <NoteAdd onAddNote={onAddNote} />
                    <NoteList onSetNotesStyle={onSetNotesStyle}
                        onRemoveNote={onRemoveNote}
                        onPinNote={onPinNote}
                        onDuplicateNote={onDuplicateNote}
                        notes={notes}
                    />
                    <Outlet />
                </section>
            </div>
        </div>
    )

}

