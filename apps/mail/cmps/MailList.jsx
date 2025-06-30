export function MailList({ mails }) {
  return (
    <section className="mail-list">
      
        {mails.map((mail) => (
          <div className="mail-item" key={mail.id}> 
             <div>{mail.from}</div>
              <div>{mail.subject}</div>
              <div>{mail.body}</div>
              <div>{new Date(mail.createdAt).toLocaleDateString()}</div>
         </div>
        ))}
       
    </section>
  )
}
