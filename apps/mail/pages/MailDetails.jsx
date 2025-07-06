const { useParams, useNavigate,useOutletContext } = ReactRouterDOM

const { useState, useEffect, Fragment } = React



import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { SideNavigation } from '../cmps/sideNavigation.jsx'
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const [mail, setMail] = useState()

  
  
  useEffect(() => {
   loadMail()
  }, [params.mailId])

  function loadMail() {
    mailService.get(params.mailId).then((mail) => setMail(mail))
  }

  function onDeleteMail() {
    if (!mail.removedAt) {
      mail.removedAt = new Date().getTime()
      mailService
        .save(mail)
        .then(() => showSuccessMsg('Mail moved to trash'))
        .then(navigate('/mail'))
        .catch(() => showErrorMsg('Cannot move mail to trash'))
    }

    else if (mail.removedAt) {
      mailService.remove(mail.id).
      then(()=>showSuccessMsg('Mail has been deleted'))
      .then(navigate('/mail'))
      .catch(()=>showErrorMsg('Cannot delete mail'))
    }
  }

  if (!mail) return <div>Loading...</div>
  return (
    <Fragment>
      <section className="details-container mail-list">
        <section className="nav-mail">
          <span className='material-symbols-outlined icon-btn' onClick={() => navigate('/mail')}>reply</span>
          <span className='material-symbols-outlined icon-btn 'onClick={() => onDeleteMail()}>delete</span>
        </section>

        <section className="mail-details">
          <div className="subject">Subject:{mail.subject}</div>
          <div className="from">From:{mail.from}</div>
          <div className="to">To:{mail.to}</div>
          <p className="body">{mail.body}</p>
        </section>
  
      </section>
  
    </Fragment>
  )
}
