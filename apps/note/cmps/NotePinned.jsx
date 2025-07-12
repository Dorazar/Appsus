import { NotePreview } from "./NotePreview.jsx"
import { NoteBtns } from './NoteBtns.jsx'


const { useNavigate } = ReactRouterDOM
const { Fragment } = React

export function NotePinned({ notes, onRemoveNote, onSetNotesStyle, onPinNote, onDuplicateNote }) {

    const navigate = useNavigate()
    const hasPinnedNotes = notes.some(note => note.isPinned)

    if (!hasPinnedNotes) return

    return (
        <Fragment>
            <p className="pinned-title">pinned</p>
            <ul className="note-list">
                {notes.map((note) => (
                    note.isPinned && (
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