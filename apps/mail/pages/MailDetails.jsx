const { useParams, useNavigate } = ReactRouterDOM

const { useState, useEffect, Fragment } = React

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
  const params = useParams()

  const navigate = useNavigate()
  const [mail, setMail] = useState()

  useEffect(() => {
    loadMail()
  }, [])

  function loadMail() {
    mailService.get(params.mailId).then((mail) => setMail(mail))
  }

  function onMoveToTrash() {
    if (!mail.removedAt) {
      mail.removedAt = new Date().getTime()
      mailService
        .save(mail)
        .then(() => showSuccessMsg('Mail moved to trash'))
        .catch(() => showErrorMsg('Error'))
    }
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
          <button onClick={() => navigate('/mail')}>Back</button>
          <button onClick={() => onMoveToTrash()}>Delete</button>
        </section>

        <section className="mail-details">
          <div className="subject">Subject:{mail.subject}</div>
          <div className="from">From:{mail.from}</div>
          <div className="to">To:{mail.to}</div>
          <p className="body">{mail.body}</p>
        </section>
        <MailFolderList />
      </section>
    </Fragment>
  )
}
