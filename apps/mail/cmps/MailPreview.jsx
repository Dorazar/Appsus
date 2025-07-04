import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, useEffect, Fragment } = React
export function MailPreview({ mail, loadMails }) {
  const [isHover, setIsHover] = useState(false)

  const isRead = mail.isRead ? 'read' : 'unread'

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

  function onStarClick() {
    console.log('star')
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
        <div
          onClick={(ev) => {
            ev.preventDefault()
            onStarClick()
          }}
        >
          <img className="star-icon" src="assets\css\imgs\greyStar.svg"></img>
        </div>
        <div>{mail.from}</div>
        <div>{isLimitTxtSize(mail.subject)}</div>
        <div>{mail.body}</div>
        <div>{!isHover && new Date(mail.createdAt).toLocaleDateString()}</div>

        {isHover && (
          <section className="popup-menu">
            <button
              onClick={(ev) => {
                ev.preventDefault()
                onDeleteMail(mail)
              }}
            >
              delete
            </button>
          </section>
        )}
      </article>
    </Fragment>
  )
}
