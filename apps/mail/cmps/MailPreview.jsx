export function MailPreview({ mail }) {
  
  


    
const isRead = mail.isRead ? 'read':'unread'


    
return (
      <article className={`mail-item ${isRead}`} key={mail.id}> 
            <div>⭐</div>
             <div>{mail.from}</div>
             <div>{mail.subject}</div>
             <div>{mail.body}</div>
             <div>{new Date(mail.createdAt).toLocaleDateString()}</div>
         </article>
  )
}
