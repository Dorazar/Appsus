import { NotePreview } from "./NotePreview.jsx"

const { useNavigate } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {

    const navigate = useNavigate()

    return (
        <div>
            <ul className="note-list">
                {notes.map((note) => (
                    <li className="note-item"
                        key={note.id}
                        // style={note.style}
                        onClick={() =>
                            navigate(`/note/edit/${note.id}`)
                            // openModal(note)
                        }
                    >
                        <NotePreview note={note} />
                        <section>
                            <button onClick={(ev) => {
                                ev.stopPropagation()
                                onRemoveNote(note.id)
                            }}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </section>
                    </li>
                ))}
            </ul>
          
        </div>
    )
}


