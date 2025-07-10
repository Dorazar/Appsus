import { noteService } from "../services/note.service.js"
import { NoteDynamicCmp } from "../cmps/NoteDynamicCmp.jsx"
// import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(null)
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        if (noteId) loadNote()
    }, [noteId])


    function loadNote() {
        noteService.get(noteId)
            .then(note => setNoteToEdit(note))
            .catch((err) => {
                console.log('Cannot get note:', err)
                navigate('/note')
            })
    }

    if (!noteToEdit) return <div>Loading...</div>;

    return (
        <section className="note-edit-modal">
            <div
                className="modal-backdrop"
                onClick={() => {

                    if (noteToEdit) {
                        noteService
                            .save(noteToEdit)
                            .then(() => navigate('/note'))
                            .catch((err) => console.log('Cannot save note:', err));
                    } else {
                        navigate('/note');
                    }
                }}
            />
            <div className="modal-content">
                <NoteDynamicCmp
                    cmpType={noteToEdit.type}
                    noteToEdit={noteToEdit}
                    setNoteToEdit={setNoteToEdit}
                    {...noteToEdit.info}
                />
            </div>
        </section>
    )
}