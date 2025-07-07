import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NoteDynamicCmp({ cmpType, ...props }) {

    console.log({ cmpType, ...props });

    const noteDynamicCmpMap = {
        NoteTxt: <NoteTxt {...props} />,
        NoteImg: <NoteImg {...props} />,
        NoteTodos: <NoteTodos {...props} />,
    }

    return noteDynamicCmpMap[cmpType]
}


