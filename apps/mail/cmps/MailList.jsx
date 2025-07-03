import { MailPreview } from './MailPreview.jsx'
const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function MailList({ mails ,loadMails}) {
  
  return (
    <article>
      <ul className="mail-list">
        {mails.map((mail) => (
          <li key={mail.id}>
            <Link to={`/mail/${mail.id}`}>
              <MailPreview mail={mail} loadMails={loadMails} />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}


