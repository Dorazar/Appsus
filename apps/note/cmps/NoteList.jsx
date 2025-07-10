import { NotePreview } from "./NotePreview.jsx"

const { useNavigate } = ReactRouterDOM
const { Fragment } = React

export function NoteList({ notes, onRemoveNote }) {

    const navigate = useNavigate()

    return (
        <Fragment>
            <ul className="note-list">
                {notes.map((note) => (
                    <li className="note-item"
                        key={note.id}
                        // style={note.style}
                        onClick={() =>
                            navigate(`/note/edit/${note.id}`)
                        }
                    >
                        <NotePreview note={note} />
                        <section className="note-btn">
                            <button onClick={(ev) => {
                                ev.stopPropagation()
                                onRemoveNote(note.id)
                            }}
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>

                            {/* <button>
                                <span className="material-symbols-outlined">
                                    palette
                                </span>
                            </button> */}
                        </section>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}


