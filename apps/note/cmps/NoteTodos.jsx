import { noteService } from "../services/note.service.js"

const { Fragment, useState, useEffect } = React
const { useNavigate } = ReactRouterDOM


export function NoteTodos({ noteToEdit, setNoteToEdit, noteId, title, todos }) {

    const navigate = useNavigate()
    const [checkedTodos, setCheckedTodos] = useState({})

    useEffect(() => {
        if (todos) {
            setCheckedTodos(
                todos.reduce((acc, todo, idx) => ({
                    ...acc,
                    [todo.txt || `todo-${idx}`]: !!todo.doneAt,
                }), {})
            )
        }
    }, [todos])

    // const [newTodo, setNewTodo] = useState('')

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
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }
        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: value },
        }));


    }

    function handleTodoChecked({ target }) {
        const field = target.name;
        const value = target.checked;

        noteService.get(noteId).then((prevNote) => {
            const updatedTodos = [...prevNote.info.todos]
            const todoIndex = updatedTodos.findIndex(
                (todo) => (todo.txt || `todo-${updatedTodos.indexOf(todo)}`) === field
            )
            if (todoIndex !== -1) {
                updatedTodos[todoIndex] = {
                    ...updatedTodos[todoIndex],
                    doneAt: value ? Date.now() : null,
                }
                const updatedNote = {
                    ...prevNote,
                    info: { ...prevNote.info, todos: updatedTodos },
                }
                setCheckedTodos((prev) => ({ ...prev, [field]: value }))
                noteService.save(updatedNote)
            }
        })

    }


    function handleTodoEdit(index) {
        setNoteToEdit((prevNote) => {
            const updatedTodos = [...prevNote.info.todos];
            updatedTodos[index] = {
                ...updatedTodos[index],
                doneAt: updatedTodos[index].doneAt ? null : Date.now(),
            };
            const updatedNote = {
                ...prevNote,
                info: { ...prevNote.info, todos: updatedTodos },
            };
            setCheckedTodos((prev) => ({
                ...prev,
                [updatedTodos[index].txt || `todo-${index}`]: !!updatedTodos[index].doneAt,
            }));
            noteService.save(updatedNote);
            return updatedNote;
        });
    }

    function handleTodoTxtChange(idx, value) {
        setNoteToEdit(prevNote => {
            const todos = [...prevNote.info.todos];
            todos[idx] = { ...todos[idx], txt: value };
            return {
                ...prevNote,
                info: {
                    ...prevNote.info,
                    todos,
                },
            };
        });
    }


    function addTodo() {
        setNoteToEdit((prevNote) => {
            const newTodo = { txt: "", doneAt: null }
            return {
                ...prevNote,
                info: {
                    ...prevNote.info,
                    todos: [...(prevNote.info.todos || []), newTodo],
                },
            }
        })
    }

    function onRemoveTodo(index) {
        setNoteToEdit((prevNote) => {
            const updatedTodos = [...prevNote.info.todos];
            updatedTodos.splice(index, 1);
            const updatedNote = {
                ...prevNote,
                info: { ...prevNote.info, todos: updatedTodos },
            };
            noteService.save(updatedNote);
            return updatedNote;
        });
    }


    if (!noteToEdit) {
        return (
            <section className="todos-type">
                {title && <h3 className="note-title">{title}</h3>}
                {todos && todos.length > 0 && (
                    <form>
                        {todos.map((todo, idx) => (
                            <div onClick={(ev) => ev.stopPropagation()} className="note-todo" key={idx}>
                                <span
                                    onClick={() => handleTodoChecked({
                                        target: {
                                            name: todo.txt || `todo-${idx}`,
                                            checked: !checkedTodos[todo.txt || `todo-${idx}`]
                                        }
                                    })}
                                    className="material-symbols-outlined todo-checkbox"
                                >
                                    {checkedTodos[todo.txt || `todo-${idx}`] ? "check_box" : "check_box_outline_blank"}
                                </span>
                                <input
                                    type="checkbox"
                                    id={todo.txt || `todo-${idx}`}
                                    name={todo.txt || `todo-${idx}`}
                                    checked={checkedTodos[todo.txt || `todo-${idx}`] || false}
                                    onChange={handleTodoChecked}
                                />
                                <label className={checkedTodos[todo.txt || `todo-${idx}`] ? "checked" : ""}
                                    htmlFor={todo.txt || `todo-${idx}`}>{todo.txt || ""}</label>
                            </div>
                        ))}
                    </form>
                )}
            </section>
        )
    }


    return (
        <Fragment>
            <form onSubmit={onSaveNote}>
                <input
                    onChange={handleChange}
                    value={noteToEdit.info.title || ""}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                />
                {noteToEdit.info.todos && noteToEdit.info.todos.length > 0 && (
                    <section className="note-todo-edit">
                        {noteToEdit.info.todos.map((todo, idx) => (
                            <div className="todo-editor" onClick={(ev) => ev.stopPropagation()} key={idx}>

                                <span
                                    onClick={() => handleTodoEdit(idx)}
                                    className="material-symbols-outlined todo-checkbox"
                                >
                                    {checkedTodos[todo.txt || `todo-${idx}`] ? "check_box" : "check_box_outline_blank"}
                                </span>
                                <input
                                    type="checkbox"
                                    id={todo.txt || `todo-${idx}`}
                                    name={todo.txt || `todo-${idx}`}
                                    checked={checkedTodos[todo.txt || `todo-${idx}`] || false}
                                    onChange={() => handleTodoEdit(idx)}
                                    style={{ display: "none" }}
                                />

                                <input
                                    type="text"
                                    value={todo.txt || ""}
                                    onChange={(ev) => handleTodoTxtChange(idx, ev.target.value)}
                                    className={checkedTodos[todo.txt || `todo-${idx}`] ? "checked" : ""}
                                />

                                <span title="delete" onClick={() => onRemoveTodo(idx)}
                                    className="material-symbols-outlined delete-todo">
                                    close
                                </span>

                            </div>
                        ))}
                    </section>
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