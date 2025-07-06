const { useRef, useEffect, useState, Fragment } = React

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link, Outlet, useSearchParams,useOutletContext } = ReactRouterDOM

export function MailCompose() {

const[newMail,setNewMail] = useState(mailService.getEmptyMail())
const {loadMails,onOpenMailWindow} = useOutletContext()
const navigate = useNavigate()

function handleChange({target}) {
  const feild=target.name
  const value=target.value
  console.log(feild,value)
  setNewMail(prevMail => ({...prevMail,[feild]:value}))
}

function onNewMailSend(ev) {
    ev.preventDefault()
    newMail.sentAt= new Date().getTime()
    mailService.save(newMail)
    .then(()=>{loadMails()}).then(()=>{onOpenMailWindow()}).then(()=>navigate("/mail")).
    then(()=>showSuccessMsg('Mail was sent successfully')).catch(()=>showErrorMsg('Cannot send mail'))
}

function onDraft(ev) {
  if (newMail.to.length===0 &
     newMail.subject.length===0 & 
     newMail.body.length===0) 
     
     {
      onOpenMailWindow()
      navigate("/mail")
      return
     }
     

    console.log('draft')
    ev.preventDefault()
     mailService.save(newMail)
    .then(()=>{loadMails()}).then(()=>{onOpenMailWindow()}).then(()=>navigate("/mail")).
    then(()=>showSuccessMsg('Mail was saved to draft')).catch(()=>showErrorMsg('Cannot save draft'))
}

  return (
    <section className="compose">
        <h1>New Message</h1>

      <form onSubmit={onNewMailSend} >

        <input onInput={handleChange} value={newMail.to} type="text" name="to" placeholder="To"/>
        <input  onInput={handleChange} value={newMail.subject} type="text" name="subject" placeholder="Subject" />
        <input onInput={handleChange}  value={newMail.body} type="text" name="body" placeholder="Body"/>

        <button>Send</button>
        <button type='button' onClick={onDraft}>X</button>
      </form>
    </section>
  )
}
