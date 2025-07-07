import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
// import { NoteFilter } from '../cmps/NoteFilter.jsx'


const { useEffect, useState } = React

const { Outlet, useLocation } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const location = useLocation();

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

    if (!notes || notes.length === 0) return <div>Loading...</div>

    return (
        <div className="layout-container">
            <section className="notes-container">
                <NoteList onRemoveNote={onRemoveNote} notes={notes} />
            </section>
            <aside className="nav-area">
                {/* Placeholder for nav area */}
            </aside>
            <Outlet />
        </div>
    )

}
