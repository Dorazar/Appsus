import { noteService } from '../services/note.service.js'
import { NoteHeader } from "../cmps/NoteHeader";
import { NoteList } from '../cmps/NoteList.jsx';

const { useSearchParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteFilter() {

    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const txt = searchParams.get('txt') || ''

    useEffect(() => {
        noteService.query({ txt }).then(setNotes)
    }, [txt])


    const handleChange = (ev) => {
        const value = ev.target.value
        if (value) {
            setSearchParams({ txt: value })
        } else {
            setSearchParams({})
        }
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
        // Find the note to update
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


 if (!notes || notes.length === 0) return <div>Loading...</div>
    return (
        <section className="note-filter-container">
            <div>
                <NoteHeader>
                    <form className="note-filter">
                        <span className="material-symbols-outlined">
                            search
                        </span>

                        <input onChange={handleChange}
                            value={txt} name="txt" id="txt" type="text"
                            placeholder="Search" autoFocus
                        />

                        <span onClick={() => navigate('/note')}
                            className="material-symbols-outlined">
                            close
                        </span>

                    </form>

                </NoteHeader>
            </div>

            {txt && (
                <NoteList
                    onSetNotesStyle={onSetNotesStyle}
                    onRemoveNote={onRemoveNote}
                    notes={notes}
                />
            )}

            {!notes || notes.length === 0 && (
                <div>No matching results.</div>
            )}
        </section>
    )

}