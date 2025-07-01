export function MailPreview({ mail }) {
  return (

      <article className="mail-item" key={mail.id}> 
      <div>⭐</div>
             <div>{mail.from}</div>
             <div>{mail.subject}</div>
             <div>{mail.body}</div>
             <div>{new Date(mail.createdAt).toLocaleDateString()}</div>
         </article>
  )
}
