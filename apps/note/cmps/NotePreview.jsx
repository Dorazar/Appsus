
export function NotePreview({ note }) {
    return (
        <div className="note-preview">
            <h3 className="note-title">{note.info.title || ''}</h3>
            <p className="note-txt">{note.info.txt || ''}</p>
            {/* <ul className="note-todo">
                {note.info.todos
                    ? note.info.todos.map((todo, idx) => (
                        <li key={idx}>
                            {todo.txt || ''}
                        </li>
                    ))
                    : null}
            </ul> */}
            {/* Other info fields can be added here if needed */}
        </div>
    )
}

// return (
//     <div>
//       {notes.map(note => (
//         <div key={note.id} style={note.style} className="note">
//           {/* Render based on note.type */}
//           {Object.keys(note.info).map((key) => {
//             const value = note.info[key];

//             // Render differently based on key or type if needed
//             if (key === 'txt') {
//               return <p key={key}>{value}</p>;
//             } else if (key === 'url') {
//               return (
//                 <img key={key} src={value} alt={note.info.title} style={{ maxWidth: '200px' }} />
//               );
//             } else if (key === 'title') {
//               return <h3 key={key}>{value}</h3>;
//             } else if (key === 'todos') {
//               return (
//                 <ul key={key}>
//                   {value.map((todo, idx) => (
//                     <li key={idx}>
//                       {todo.txt} {todo.doneAt ? '(Done)' : '(Pending)'}
//                     </li>
//                   ))}
//                 </ul>
//               );
//             } else {
//               return null;
//             }
//           })}
//         </div>
//       ))}
//     </div>
//   );
// }


