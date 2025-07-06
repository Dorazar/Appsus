import { NotePreview } from "./NotePreview.jsx"
import { NoteModal } from "../cmps/NoteModal.jsx"

const { useState } = React
const { useNavigate } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {

    // const [isModalOpen, setIsModalOpen] = useState(false)
    // const [selectedNote, setSelectedNote] = useState(null)
    const navigate = useNavigate()

    // function openModal(note) {
    //     // console.log(note);
    //     setSelectedNote(note)
    //     setIsModalOpen(true)
    // }

    // function closeModal() {
    //     setSelectedNote(null)
    //     setIsModalOpen(false)
    // }

    return (
        <div>
            <ul className="note-list">
                {notes.map((note) => (
                    <li className="note-item"
                        key={note.id}
                        style={note.style}
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
            {/* <NoteModal onClose={closeModal} isOpen={isModalOpen}>
                {selectedNote &&
                    <NotePreview note={selectedNote} />}
            </NoteModal> */}
        </div>
    )
}


