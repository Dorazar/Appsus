import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ notes }) {

    return (
        <ul className="note-list">
            {notes.map((note) => (
                <li className="note-item" key={note.id} style={note.style}>
                    <NotePreview note={note} />
                </li>
            ))}
        </ul>
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
