import { noteService } from '../services/note.service.js'
import { NoteHeader } from "../cmps/NoteHeader";
import { NoteList } from '../cmps/NoteList.jsx';

const { useSearchParams, useNavigate, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteFilter() {

    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()

    const txt = searchParams.get('txt') || ''
    const type = searchParams.get('type') || ''

    useEffect(() => {
        noteService.query({ txt, type }).then(setNotes)
    }, [txt, type])


    function handleChange(ev) {
        const value = ev.target.value
        setSearchParams({ txt: value, type })
    }

    function handleTypeFilter(cmpType) {
        setSearchParams({ txt, type: cmpType })
    }

    function onBack() {
        if (type) navigate('/note/search')
        else navigate('/note')
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

    if (!notes || notes.length === 0) {
        return (
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

                        <span onClick={() => onBack()}
                            className="material-symbols-outlined">
                            close
                        </span>

                    </form>

                </NoteHeader>
                <div>Loading...</div>
            </div>
        )
    }

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

                        <span onClick={() => onBack()}
                            className="material-symbols-outlined">
                            close
                        </span>

                    </form>

                </NoteHeader>
            </div>

            {location.pathname === '/note/search' && !txt && !type &&
                <section className="filter-by-stuff">
                    <section className="filter-types">
                        <div>Types</div>
                        <ul className="type-ul">
                            <li className="type-li"
                                style={{ backgroundColor: '#1a73e8' }}
                                onClick={() => handleTypeFilter('NoteImg')}
                            >
                                <span className="material-symbols-outlined note-btn">photo</span>
                            </li>
                            <li className="type-li"
                                style={{ backgroundColor: '#1a73e8' }}
                                onClick={() => handleTypeFilter('NoteTodos')}
                            >
                                <span className="material-symbols-outlined note-btn">list</span>
                            </li>
                        </ul>
                    </section>
                </section>
            }

            {(txt || type) && (
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