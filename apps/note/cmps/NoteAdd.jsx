import { noteService } from '../services/note.service.js'

const { useState } = React

export function NoteAdd({ onAddNote }) {

    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [isExpanded, setExpanded] = useState(false)

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
        setNewNote((prevNote) => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: value },
        }));
    }

    function onSaveNote(ev) {
        ev.preventDefault();
        if (Object.values(newNote.info).every(value => !value)) {
            setExpanded(false)
            return
        }

        onAddNote(newNote)
        setNewNote(noteService.getEmptyNote())
        setExpanded(false)
    }

    function handleExpanded() {
        setExpanded(true)
    }

    return (
        <form className="add-note-form" onSubmit={onSaveNote}>
            {isExpanded && (<input
                value={newNote.info.title || ''}
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
            />)}
            <p>
                <textarea
                    value={newNote.info.txt || ''}
                    name="txt"
                    placeholder="Take a Note..."
                    onChange={handleChange}
                    onClick={handleExpanded}
                ></textarea>
            </p>
            {isExpanded && (<div className="modal-actions">
                <button type="submit">Add</button>
            </div>)}

        </form>
    )
}