export function MailPreview({ mail }) {
  
  

const isRead = mail.isRead ? 'read':'unread'


function onMouseHover() {
    // console.log('hi')
}

function isLimitTxtSize(subject) {
    if (subject.length > 20) {
        return subject.slice(0,20)+'...'
    }
    else {
        return subject
    }
}

if (!mail) return <div>Loading...</div>
    
return (
      <article onMouseEnter={onMouseHover}
       className={`mail-item ${isRead}`} key={mail.id}> 
            <div>⭐</div>
             <div>{mail.from}</div>
             <div>{isLimitTxtSize(mail.subject)}</div>
             <div>{mail.body}</div>
             <div>{new Date(mail.createdAt).toLocaleDateString()}</div>
         </article>
  )
}
