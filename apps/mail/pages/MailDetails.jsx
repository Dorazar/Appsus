const { useParams } = ReactRouterDOM

const { useState, useEffect, Fragment } = React

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
  const params = useParams()

  const [mail, setMail] = useState()

  useEffect(() => {
    loadMail()
  }, [])

  function loadMail() {
    mailService.get(params.mailId).then((mail) => setMail(mail))
  }

  if (!mail) return <div>Loading...</div>
  return (
    <Fragment>
        <section className="details-container">
      <section className="upper-filter">
        <img className="mail-logo" src="assets\css\imgs\Gmail_icon_(2020).svg" alt="" />
        <label htmlFor="filter"></label>
        <input type="text" name="filter" placeholder="Search mails" />
        <button>Search</button>

       
      </section>

      <section className="mail-details">
        <div className='subject'>Subject:{mail.subject}</div>
        <div className='from'>From:{mail.from}</div>
        <div className='to'>To:{mail.to}</div>
        <p className='body'>{mail.body}</p>
        
      </section>
      <MailFolderList />
      </section>
    </Fragment>
  )
}
