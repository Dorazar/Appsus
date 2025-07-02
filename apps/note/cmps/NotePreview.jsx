const { Fragment } = React

export function NotePreview({ note }) {
    return (
        <Fragment>
            {Object.keys(note.info).map((key) => {
                const value = note.info[key]
                if (key === 'txt') {
                    return <p key={key}>{value}</p>
                } else if (key === 'title') {
                    return <h3 key={key}>{value}</h3>
                } else {
                    return null
                }
            })}
        </Fragment>
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


