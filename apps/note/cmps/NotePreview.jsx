import { NoteDynamicCmp } from '../cmps/NoteDynamicCmp.jsx'

const { useState } = React

export function NotePreview({ note }) {

    const [cmpType, setCmpType] = useState(note.type)

    return (
        <div className="note-preview">
            <NoteDynamicCmp cmpType={cmpType} {...note.info} />
        </div>
    )
}





