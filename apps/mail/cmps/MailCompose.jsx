const { useRef, useEffect, useState, Fragment } = React

import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link, Outlet, useSearchParams,useOutletContext } = ReactRouterDOM

export function MailCompose() {

const[newMail,setNewMail] = useState(mailService.getEmptyMail())
const {loadMails} = useOutletContext()
const navigate = useNavigate()

function handleChange({target}) {
  const feild=target.name
  const value=target.value
  setNewMail(prevMail => ({...prevMail,[feild]:value}))
}

function onNewMailSend(ev) {
    ev.preventDefault()
    
    mailService.save(newMail)
    .then(()=>{loadMails()})
}



  return (
    <section className="compose">
        <h1>New Message</h1>

      <form onSubmit={onNewMailSend}>

        <input onInput={handleChange} value={newMail.to} type="text" name="to" placeholder="To"/>
        <input  onInput={handleChange} value={newMail.subject} type="text" name="subject" placeholder="Subject" />
        <input onInput={handleChange}  value={newMail.body} type="text" name="body" placeholder="Body"/>

        <button>Send</button>
      </form>
    </section>
  )
}
