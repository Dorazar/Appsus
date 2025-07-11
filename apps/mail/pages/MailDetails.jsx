const { useParams, useNavigate, useOutletContext } = ReactRouterDOM

const { useState, useEffect, Fragment } = React

import { storageService } from '../../../services/async-storage.service.js'
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
    } else if (mail.removedAt) {
      mailService
        .remove(mail.id)
        .then(() => showSuccessMsg('Mail has been deleted'))
        .then(navigate('/mail'))
        .catch(() => showErrorMsg('Cannot delete mail'))
    }
  }

  function onSaveAsANote(mail) {
    const note = mailService.getEmptyNote()
    note.info.from=mail.from
    note.info.subject=mail.subject
    note.info.body=mail.body
    mailService.saveNote(note).then(()=>showSuccessMsg('Mail saved as a note'))
    .catch(()=>showErrorMsg('Mail not saved as a note'))

  }

  if (!mail) return <div>Loading...</div>
  return (
    <Fragment>
      <section className="details-container mail-list">
        <section className="nav-mail">
           <span title={'Delete'} className="material-symbols-outlined icon-btn " onClick={() => onDeleteMail()}>
            delete
          </span>
          <span title={'Back'} className="material-symbols-outlined icon-btn" onClick={() => navigate('/mail')}>
            reply
          </span>
           <span title={'Save as a note'} className="material-symbols-outlined icon-btn"  onClick={()=>onSaveAsANote(mail)}>note_stack_add</span>
         
         
        </section>




        <section className="mail-details">
          <div className="subject">{mail.subject}</div>
          <div className="from">{mail.from}</div>
          <div className="to">To:{mail.to}</div>
          <div className="createdAt">
            {new Date(mail.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <p className="mail-body">{mail.body}</p>
        </section>
      </section>
    </Fragment>
  )
}
