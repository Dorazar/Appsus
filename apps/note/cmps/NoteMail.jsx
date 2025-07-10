export function NoteMail({ noteToEdit, setNoteToEdit, subject, from, body }) {
    
        return (

            <section className="mail-details">
                <div className="subject">{subject}</div>
                <div className="from">{from}</div>
                <p className="mail-body">{body}</p>
            </section>
        )

}