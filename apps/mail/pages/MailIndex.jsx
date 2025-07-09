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

useEffect(()=>{
  if (mails) loadUnreadMails()
  // console.log('done')
},[mails])

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }
  // console.log('FilterBy:',filterBy)
  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails))
  }



  



function loadUnreadMails() {
  if (!mails) return
if (searchParams.get('folder')==='inbox' || !searchParams.get('folder')) {
    const filterdMails = mails.filter(mail => 
    mail.to==='user@appsus.com' &&
     mail.isRead===false &&

       mail.removedAt===null)
const mailNum = filterdMails.length

setUnreadMails(mailNum)
//  console.log(mailNum)   
}
   
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
      <Link className="new-mail-btn" to="/mail/newMail">
 
         <span onClick={onOpenMailWindow} className="material-symbols-outlined compose-icon">
          edit
           <span className='compose-text'>Compose</span>
        </span>
     
       
      </Link>
      {newMailWindow && <Outlet context={{ loadMails, onOpenMailWindow }} />}

      <MailFolderList onSetFilterBy={onSetFilterBy}  unreadMails={unreadMails}/>

      <Link to="/mail/:mailId"></Link>
      {params.mailId && <Outlet  />}
    </section>
  )
}
