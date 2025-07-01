const { Fragment } = React;

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

