import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'

// import { NoteFilter } from '../cmps/NoteFilter.jsx'

const { useEffect, useState } = React
const { Outlet, useLocation } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const location = useLocation()

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
        console.log(noteId);
        
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId
                    ? { ...note, style: { ...note.style, backgroundColor: newBackgroundColor } }
                    : note
            )
        )
    }

    function onAddNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote]
        })
    }

    if (!notes || notes.length === 0) return <div>Loading...</div>

    return (

        <div>
            <header className="note-header">
                <div className="note-logo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 88"
                        onClick={() => onMailNav('/note')}
                    >
                        <path d="M 42,22 54.065,24.28 64,22 42,0 38.965,10.43 Z" fill="#f29900" />
                        <path
                            d="M 42,22 V 0 H 6 C 2.685,0 0,2.685 0,6 v 76 c 0,
             3.315 2.685,6 6,6 h 52 c 3.315,0 6,-2.685 6,-6 V 22 Z"
                            fill="#fbbc04"
                        />
                        <path
                            d="M 39,64 H 25 V 59 H 39 Z M 38.92501,54 H 25.075 C 21.425,51.7 19,47.635 19,43 c 0,
            -7.18 5.82,-13 13,-13 7.18,0 13,5.82 13,13 0,4.635 -2.425,8.7 -6.075,11 z"
                            fill="#fff"
                        />
                    </svg>
                </div>

                <input type="text" />
                <AppHeader />
            </header>

            <div className="layout-container">

                <aside className="nav-area">
                    {/* Placeholder for nav area */}
                </aside>
                <section className="notes-container">
                    <NoteAdd onAddNote={onAddNote} />
                    <NoteList onSetNotesStyle={onSetNotesStyle}
                        onRemoveNote={onRemoveNote}
                        notes={notes}
                    />
                    <Outlet />
                </section>
            </div>
        </div>
    )

}
