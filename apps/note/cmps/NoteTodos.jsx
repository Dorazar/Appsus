import { noteService } from "../services/note.service.js"

const { Fragment, useState } = React
const { useNavigate } = ReactRouterDOM


export function NoteTodos({ noteToEdit, setNoteToEdit, title, todos }) {

    const navigate = useNavigate()
    const [newTodo, setNewTodo] = useState('')

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

    function handleTodoTxtChange(index, value) {
        setNoteToEdit((prevNote) => {
            const updatedTodos = [...prevNote.info.todos];
            updatedTodos[index] = { ...updatedTodos[index], txt: value };
            return {
                ...prevNote,
                info: { ...prevNote.info, todos: updatedTodos },
            };
        });
    }

       function addTodo() {
        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos: [...(prevNote.info.todos || []), { txt: '', doneAt: null }],
            },
        }));
    }

      function toggleTodoDone(index) {
        setNoteToEdit((prevNote) => {
            const updatedTodos = [...prevNote.info.todos];
            updatedTodos[index] = {
                ...updatedTodos[index],
                doneAt: updatedTodos[index].doneAt ? null : Date.now(),
            };
            return {
                ...prevNote,
                info: { ...prevNote.info, todos: updatedTodos },
            };
        });
    }

    if (!noteToEdit) {
        return (
            <section className="todos-type">
                {title && <h3 className="note-title">{title}</h3>}
                {todos && todos.length > 0 && (
                    <ul className="note-todo">
                        {todos.map((todo, idx) => (
                            <li key={idx}>
                                {todo.txt || ''}
                            </li>
                        ))}
                    </ul>
                )}
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
                {noteToEdit.info.todos && noteToEdit.info.todos.length > 0 && (
                    <ul className="note-todo">
                        {noteToEdit.info.todos.map((todo, idx) => (
                            <li key={idx}>
                                <input
                                    type="checkbox"
                                    checked={!!todo.doneAt}
                                    onChange={() => toggleTodoDone(idx)}
                                />
                                <input
                                    type="text"
                                    value={todo.txt || ''}
                                    onChange={(ev) => handleTodoTxtChange(idx, ev.target.value)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <button type="button" onClick={addTodo}>
                    + Add Todo
                </button>
                 <div className="modal-actions">
                    <button type="submit">Cancel</button>
                </div>
            </form>
        </Fragment>
    )
}