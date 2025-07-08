import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NoteDynamicCmp({ cmpType, noteToEdit, setNoteToEdit, ...props }) {

    // console.log({ cmpType, ...props })

    const noteDynamicCmpMap = {
        NoteTxt: <NoteTxt {...props} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />,
        NoteImg: <NoteImg {...props} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />,
        NoteTodos: <NoteTodos {...props} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />,
    }

    return noteDynamicCmpMap[cmpType]
}


