import { MailPreview } from './MailPreview.jsx'
const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailList({ mails ,loadMails,loadUnreadMails}) {
  

if (mails.length===0) {
  
  return <section className="mail-list">No mails here</section>

}
  return (
    
      <ul className="mail-list">
        {mails.map((mail) => (
          <li key={mail.id}>
            <Link to={`/mail/${mail.id}`}>
              <MailPreview mail={mail} loadMails={loadMails} loadUnreadMails={loadUnreadMails} />
            </Link>
          </li>
        ))}
      </ul>
  
  )
}


