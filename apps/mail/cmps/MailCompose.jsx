const { useRef, useEffect, useState, Fragment } = React

import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailCompose(params) {

const[newMail,setNewMail] = useState(mailService.getEmptyMail())



function onNewMail() {

    console.log(newMail)

}


  return (
    <section className="compose">
        <h1>New Message</h1>

      <form action="">

        <input type="text" name="to" placeholder="To"/>
        <input type="text" name="subject" placeholder="Subject" />
        <input type="text" name="body" placeholder="Body"/>

        <button onClick={(ev)=>onNewMail(ev.preventDefault())}>Send</button>
      </form>
    </section>
  )
}
