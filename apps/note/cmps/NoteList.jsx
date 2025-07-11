import { NotePreview } from "./NotePreview.jsx"
import { NoteBtns } from './NoteBtns.jsx'

const { useNavigate } = ReactRouterDOM
const { Fragment } = React

export function NoteList({ notes, onRemoveNote, onSetNotesStyle }) {

    const navigate = useNavigate()

    return (
        <Fragment>
            <ul className="note-list">
                {notes.map((note) => (
                    <li className="note-item"
                        key={note.id}
                        style={note.style}
                        onClick={() =>
                            navigate(`/note/edit/${note.id}`)
                        }
                    >
                        <NotePreview note={note} />
                        <NoteBtns
                            noteId={note.id}
                            onRemoveNote={onRemoveNote}
                            onSetNotesStyle={onSetNotesStyle}
                        />
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}


