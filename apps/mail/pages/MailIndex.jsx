import { mailService } from '../services/mail.service.js'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {
  const [mails, setMails] = useState(null)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService.query().then((mails) => setMails(mails))
  }

  if (!mails || mails.length===0) return <div>Loading...</div> 
  return (
    <section className="container">
      Mail app
      <ul>{
      mails.map(mail => (
      <li key={mail.id}>{mail.subject}</li>) )
      }
      </ul>
    </section>
  )
}
