import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
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

    function onAddNote(newNote){
        setNotes((prevNotes)=>{
            return[...prevNotes,newNote]
        })
    }

    if (!notes || notes.length === 0) return <div>Loading...</div>

    return (
        <div className="layout-container">

            <aside className="nav-area">
                {/* Placeholder for nav area */}
            </aside>
            <section className="notes-container">
                <NoteAdd onAddNote={onAddNote}/>
                <NoteList onRemoveNote={onRemoveNote} notes={notes} />
                <Outlet />
            </section>
        </div>
    )

}
