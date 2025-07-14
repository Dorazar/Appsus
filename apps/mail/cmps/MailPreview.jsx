import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect, Fragment, useRef } = React
export function MailPreview({ mail, loadMails, loadUnreadMails }) {
  const [isHover, setIsHover] = useState(false)

  const [iconChanage, setIconChange] = useState(mail.isRead)

  const isRead = mail.isRead ? 'read' : 'unread'

  const isReadIconChange = mail.isRead ? 'mark_email_unread' : 'drafts'

  function handleMouseOver() {
    setIsHover((prevValue) => !prevValue)
  }

  function handleMouseOut() {
    setIsHover((prevValue) => !prevValue)
  }

  function isLimitTxtSize(subject) {
    if (subject.length > 20) {
      return subject.slice(0, 20) + '...'
    } else {
      return subject
    }
  }

  function onDeleteMail(mail) {
    if (!mail.removedAt) {
      mail.removedAt = new Date().getTime()
      mailService
        .save(mail)
        .then(() => showSuccessMsg('Mail moved to trash'))
        .then(() => loadMails())

        .catch(() => showErrorMsg('Cannot move mail to trash'))
    } else if (mail.removedAt) {
      mailService
        .remove(mail.id)
        .then(() => showSuccessMsg('Mail has been deleted'))
        .then(() => loadMails())

        .catch(() => showErrorMsg('Cannot delete mail'))
    }
  }

  function onSetReadUnreadMail(mail) {
    if (mail.isRead) {
      mail.isRead = false
    } else if (!mail.isRead) {
      mail.isRead = true
    }
    setIconChange((iconChanage) => !iconChanage)
    mailService.save(mail).then(setIconChange).then(()=>loadUnreadMails())
  }

  const star = useRef()

  function onStarClick(isStared) {
    if (isStared) {
      mail.isStared = false
      mailService.save(mail)
      star.current.src = 'assets/css/imgs/greyStar.svg'
      return
    } else if (!isStared) {
      mail.isStared = true
      mailService.save(mail)
      star.current.src = 'assets/css/imgs/yellowStar.svg'
    }
  }

  function isStaredMail(isStared) {
    if (isStared) {
      return 'assets/css/imgs/yellowStar.svg'
    } else {
      return 'assets/css/imgs/greyStar.svg'
    }
  }

function isToday(timestamp) {
  const today = new Date()
  const date = new Date(timestamp)
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

function isSameYear(timestamp) {
  const today = new Date()
  const date = new Date(timestamp)
  return date.getFullYear() === today.getFullYear()
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
      <article
        className={`mail-item ${isRead}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        key={mail.id}
      >
        <img
          ref={star}
          onClick={(ev) => {
            ev.preventDefault()
            onStarClick(mail.isStared)
          }}
          className="star-icon"
          src={isStaredMail(mail.isStared)}
        ></img>

        <div>{mail.from}</div>
        <div>{isLimitTxtSize(mail.subject)}</div>
        <div>{mail.body}</div>

       <div className='popup-container'>
 <div className='mail-date'> {  (
    
    isToday(mail.createdAt)
      ? new Date(mail.createdAt).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
      : isSameYear(mail.createdAt)
        ? new Date(mail.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : new Date(mail.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  )}</div>
          {isHover && (
          
          <section className="popup-menu">
  
              <span
              title="Save as a note"
              className="material-symbols-outlined btn"
              onClick={(ev) => {
                ev.preventDefault()
                onSaveAsANote(mail)
              }}
            >
              note_stack_add
            </span>
                      <span
              title={mail.isRead ? 'Mark as unread' : 'Mark as read'}
              className="material-symbols-outlined btn"
              onClick={(ev) => {
                ev.preventDefault()
            
                onSetReadUnreadMail(mail)
              }}
            >
              {isReadIconChange}
            </span>
            <span
              title="Delete"
              className="material-symbols-outlined btn"
              onClick={(ev) => {
                ev.preventDefault()
                onDeleteMail(mail)
              }}
            >
              delete
            </span>
           
          </section>
        )}
</div>



      </article>
    </Fragment>
  )
}
