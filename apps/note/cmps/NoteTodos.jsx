
export function NoteTodos({ title, todos }) {
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
    );
}