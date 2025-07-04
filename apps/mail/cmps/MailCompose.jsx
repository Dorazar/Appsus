const { useRef, useEffect, useState, Fragment } = React

import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailCompose(params) {

const[newMail,setNewMail] = useState(mailService.getEmptyMail())


useEffect(()=>{
    console.log(newMail)

},


[newMail])




function handleChange({target}) {
  const feild=target.name
  const value=target.value
  setNewMail(prevMail => ({...prevMail,[feild]:value}))
}

function onNewMailSend(ev) {
    ev.preventDefault()
    mailService.save(newMail)
}



  return (
    <section className="compose">
        <h1>New Message</h1>

      <form onSubmit={onNewMailSend}>

        <input onInput={handleChange} type="text" name="to" placeholder="To"/>
        <input  onInput={handleChange} type="text" name="subject" placeholder="Subject" />
        <input onInput={handleChange}  type="text" name="body" placeholder="Body"/>

        <button>Send</button>
      </form>
    </section>
  )
}
