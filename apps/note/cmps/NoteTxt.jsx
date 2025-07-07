export function NoteTxt({ title, txt }) {

    return (
        <section className="txt-type">
            <h3 className="note-title">{title || ''}</h3>
            <p className="note-txt">{txt || ''}</p>
        </section>
    )
}