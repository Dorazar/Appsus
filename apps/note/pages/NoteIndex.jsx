import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then((notes) => setNotes(notes))
    }

    if (!notes || notes.length === 0) return <div>Loading...</div>

    return (
        <div className="layout-container">
            <section className="notes-container">
                <NoteList notes={notes} />
            </section>
            <aside className="nav-area">
                {/* Placeholder for nav area */}
            </aside>
        </div>
    )

}
