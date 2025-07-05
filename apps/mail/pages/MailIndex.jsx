import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'


const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState(null)
 const [searchParams,setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))




  useEffect(() => {
    loadMails()
    setSearchParams(filterBy)
  }, [filterBy])

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter,...filterBy }))
  }
// console.log('FilterBy:',filterBy)
  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails))
  
  }
  
  

  const [newMailWindow,setNewMailWindow]=useState(false)


  function onOpenMailWindow() {
  
    setNewMailWindow(prevNewMail =>!prevNewMail)

  }


  if (!mails) return <div>Loading...</div>
  if (mails.length === 0)
    return (
      <section className="main-container">
        <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
         <Link className='new-mail-btn' to="/mail/newMail"><button onClick={onOpenMailWindow}>new mail</button></Link>
      {newMailWindow && <Outlet context={{loadMails,onOpenMailWindow}} />}
        <p>No mails found</p>
      </section>
    )
  return (
    <section className="main-container">
      <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy}/>
      <MailList mails={mails} loadMails={loadMails}/>
      <Link className='new-mail-btn' to="/mail/newMail">
      
      
     
      <span onClick={onOpenMailWindow} class="material-symbols-outlined">
edit
</span>

      
      
      </Link>
      {newMailWindow && <Outlet context={{loadMails,onOpenMailWindow}} />}
    </section>
  )
}
