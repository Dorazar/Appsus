import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailDetails } from './MailDetails.jsx'
import { AppHeader } from '../../../cmps/AppHeader.jsx'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
  const [unreadMails,setUnreadMails] = useState()

  const params = useParams()


  useEffect(() => {
   

 loadMails()
    // console.log('Index:', params.mailId)
    setSearchParams(filterBy)
    
  }, [filterBy])

useEffect(() => {
  loadUnreadMails()
}, [filterBy.folder, mails])

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }
  // console.log('FilterBy:',filterBy)
function loadMails() {
  mailService.query(filterBy).then((mails) => {
    setMails(mails)
    loadUnreadMails() 
  })
}



  



function loadUnreadMails() {
  if (!mails) return
  const unreadFilter = {
    folder: 'inbox'
  }

  mailService.query(unreadFilter).then(allInboxMails => {
    const unread = allInboxMails.filter(mail =>
      mail.to === 'user@appsus.com' &&
      mail.isRead === false &&
      mail.removedAt === null
    )
    setUnreadMails(unread.length)
  })
   
}

  const [newMailWindow, setNewMailWindow] = useState(false)

  function onOpenMailWindow() {
    setNewMailWindow((prevNewMail) => !prevNewMail)
  }


  // console.log(unreadMails)

  if (!mails) return <div>Loading...</div>

  return (
    <section className="main-container">
      
      <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
      <AppHeader/>
      {!params.mailId && < MailList mails={mails} loadMails={loadMails} loadUnreadMails={loadUnreadMails} />}
     <div className="new-mail-btn">
      <Link  to="/mail/newMail">
 
         <span onClick={onOpenMailWindow} className="material-symbols-outlined compose-icon">
          edit
           <span className='compose-text'>Compose</span>
        </span>
     
       
      </Link>
      </div> 
      {newMailWindow && <Outlet context={{ loadMails, onOpenMailWindow }} />}

      <MailFolderList onSetFilterBy={onSetFilterBy}  unreadMails={unreadMails}/>

      
      {params.mailId && <Outlet  />}
    </section>
  )
}
