
export function NoteImg({ title, txt, url }) {
    return (
        <section className="img-type">
            {title && <h3 className="note-title">{title}</h3>}
            {txt && <p className="note-txt">{txt}</p>}
            <img src={url} alt={title || 'Image'} style={{ maxWidth: '200px' }} />
        </section>
    )
}


