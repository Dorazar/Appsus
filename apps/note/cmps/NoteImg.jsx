import { noteService } from "../services/note.service.js"

const { Fragment } = React
const { useNavigate } = ReactRouterDOM

export function NoteImg({noteToEdit, setNoteToEdit, title, txt, url }) {

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

    if (!noteToEdit) {
        // console.log(url)
        
        return (
            <section className="img-type">
                {title && <h3 className="note-title">{title}</h3>}
                {txt && <p className="note-txt">{txt}</p>}
                <img src={url} alt={title || 'Image'} style={{ maxWidth: '200px' }} />
            </section>
        )
    }

    return (
        <Fragment>
            <form onSubmit={onSaveNote}>
                <input
                    onChange={handleChange}
                    value={noteToEdit.info.title || ''}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                />
                <textarea
                    onChange={handleChange}
                    value={noteToEdit.info.txt || ''}
                    name="txt"
                    id="txt"
                    placeholder="Write a description..."
                />
                <input
                    onChange={handleChange}
                    value={noteToEdit.info.url || ''}
                    type="text"
                    name="url"
                    id="url"
                    placeholder="Enter image URL"
                />
                 <div className="modal-actions">
                    <button type="submit">Cancel</button>
                </div>
            </form>
        </Fragment>
    )
}


