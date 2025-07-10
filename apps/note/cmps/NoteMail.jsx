import { noteService } from "../services/note.service.js"

const { Fragment } = React
const { useNavigate } = ReactRouterDOM

export function NoteMail({ noteToEdit, setNoteToEdit, subject, from, body }) {
console.log('hi');

    const navigate = useNavigate()

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => navigate('/note'))
            .catch(err => {
                console.log('Cannot save note:', err)
                // showErrorMsg('Cannot save note')
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
        
        return (

            <section className="mail-details">
                <div className="subject">{subject}</div>
                <div className="from">{from}</div>
                <p className="mail-body">{body}</p>
            </section>
        )

}