import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailDetails } from './MailDetails.jsx'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

  const params = useParams()


  useEffect(() => {
    loadMails()
    // console.log('Index:', params.mailId)
    setSearchParams(filterBy)

  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }
  // console.log('FilterBy:',filterBy)
  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails))
  }

  const [newMailWindow, setNewMailWindow] = useState(true)

  function onOpenMailWindow() {
    setNewMailWindow((prevNewMail) => !prevNewMail)
  }



  if (!mails) return <div>Loading...</div>
  // if (mails.length === 0)
  //   return (

  //         <section className="main-container">
  //           <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
  //           <Link className="new-mail-btn" to="/mail/newMail">
  //             <span onClick={onOpenMailWindow} className="material-symbols-outlined">
  //               edit
  //             </span>
  //           </Link>
  //           {newMailWindow && <Outlet context={{ loadMails, onOpenMailWindow }} />}
  //           <p>No mails found</p>
  //             <MailFolderList onSetFilterBy={onSetFilterBy} />
  //         </section>
  //       )
  return (
    <section className="main-container">
      <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
      {!params.mailId && < MailList mails={mails} loadMails={loadMails} />}
      <Link className="new-mail-btn" to="/mail/newMail">
        <span onClick={onOpenMailWindow} className="material-symbols-outlined">
          edit
        </span>
      </Link>
      {newMailWindow && <Outlet context={{ loadMails, onOpenMailWindow }} />}

      <MailFolderList onSetFilterBy={onSetFilterBy} />

      <Link to="/mail/:mailId"></Link>
      {params.mailId && <Outlet  />}
    </section>
  )
}
