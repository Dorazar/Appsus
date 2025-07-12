import { NotePreview } from "./NotePreview.jsx"
import { NoteBtns } from './NoteBtns.jsx'
import { NotePinned } from "./NotePinned.jsx"

const { useNavigate } = ReactRouterDOM
const { Fragment } = React

export function NoteList({ notes, onRemoveNote, onSetNotesStyle, onPinNote, onDuplicateNote }) {

    const navigate = useNavigate()
    const hasPinnedNotes = notes.some(note => note.isPinned)

    return (
        <Fragment>
            <NotePinned
                onSetNotesStyle={onSetNotesStyle}
                onRemoveNote={onRemoveNote}
                onPinNote={onPinNote}
                onDuplicateNote={onDuplicateNote}
                notes={notes}
            />
            {hasPinnedNotes && (<p className="pinned-title">others</p>)}
            <ul className="note-list">
                {notes.map((note) => (
                    !note.isPinned && (
                        <li className="note-item"
                            key={note.id}
                            style={note.style}
                            onClick={() =>
                                navigate(`/note/edit/${note.id}`)
                            }
                        >
                            <section className="note-btns">
                                <button onClick={(ev) => {
                                    ev.stopPropagation()
                                    onPinNote(note.id)
                                }}>
                                    <span className="material-symbols-outlined">
                                        keep
                                    </span>
                                </button>
                            </section>

                            <NotePreview note={note} />
                            <NoteBtns
                                noteId={note.id}
                                onRemoveNote={onRemoveNote}
                                onSetNotesStyle={onSetNotesStyle}
                                onDuplicateNote={onDuplicateNote}
                            />
                        </li>
                    )))}
            </ul>
        </Fragment>
    )
}


