import { NoteDynamicCmp } from '../cmps/NoteDynamicCmp.jsx'

const { useState } = React

export function NotePreview({ note, onSetColor }) {

    const [cmpType, setCmpType] = useState(note.type)

    // const [noteStyle, setNoteStyle] = useState({
    //     backgroundColor: note.style.backgroundColor,
    // })

    // console.log(note.info);
    // console.log(noteStyle);

    // function onSetNoteStyle(newStyle) {
    //     setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
    // }

    return (
        <div className="note-preview">
            <NoteDynamicCmp cmpType={cmpType} {...note.info} />
        </div>
    )
}





