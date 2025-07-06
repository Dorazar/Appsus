import { noteService } from "../services/note.service.js"
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
            .catch(err => console.log('Cannot get note:', err))
    }


    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => navigate('/note'))
            .catch(err => {
                console.log('Cannot save note:', err)
                showErrorMsg('Cannot save note')
            })
    }

    function handleChange({ target }) {

        const field = target.name;
        let value = target.value;
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value;
                break;
            case 'checkbox':
                value = target.checked;
                break;
        }
        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: value },
        }));
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
                <form onSubmit={onSaveNote}>
                    {/* <label htmlFor="title">Title</label> */}
                    <input
                        onChange={handleChange}
                        value={noteToEdit.info.title || ''}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                    />

                    {/* <label htmlFor="txt">Write</label> */}
                    <textarea
                        onChange={handleChange}
                        value={noteToEdit.info.txt || ''}
                        name="txt"
                        id="txt"
                        placeholder="Write a note..."
                    />

                    <div className="modal-actions">
                        <button type="submit">Cancel</button>
                    </div>
                </form>
            </div>
        </section>
    );
}