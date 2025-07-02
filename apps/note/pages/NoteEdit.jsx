import { noteService } from "../services/note.service.js"
// import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function NoteEdit() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        if (noteId) loadNote()
    }, [])


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
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }

    const note = noteToEdit

    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={note.title ? note.title : 'Title'} type="text" name="title" id="title" />

                <label htmlFor="txt">Write</label>
                <input onChange={handleChange} value={note.txt ? note.txt : 'Write a note'} type="text" name="txt" id="txt" />

                <button>Save</button>
            </form>

        </section>
    )

}