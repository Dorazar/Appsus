const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailCompose(params) {


function onNewMail() {
    
}


  return (
    <section className="compose">
        <h1>New Message</h1>
        
      <form action="">

        <input type="text" name="to" placeholder="To"/>
        <input type="text" name="subject" placeholder="Subject" />

        <button onClick={(ev)=>onNewMail(ev.preventDefault())}>Send</button>
      </form>
    </section>
  )
}
