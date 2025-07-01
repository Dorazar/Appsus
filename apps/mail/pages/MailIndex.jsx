
import { mailService } from '../services/mail.service.js'
import {MailList} from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    loadMails()
  }, [])


  function onDeleteMail() {
    
  }


  function loadMails() {
    mailService.query().then((mails) => setMails(mails))
  }

  if (!mails || mails.length===0) return <div>Loading...</div> 
  return (
    
    <section className="main-container">
      <MailFilter/>
      <MailList mails={mails}/>
      
    </section>
  )
}
