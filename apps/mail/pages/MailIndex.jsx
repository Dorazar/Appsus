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
console.log('FilterBy:',filterBy)
  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails))
  }
  
  

  if (!mails) return <div>Loading...</div>
  if (mails.length === 0)
    return (
      <section className="main-container">
        <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
        <p>No mails found</p>
      </section>
    )
  return (
    <section className="main-container">
      <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
      <MailList mails={mails} />
       <MailFolderList onSetFilterBy={onSetFilterBy} defaultFilter={filterBy}/>
    </section>
  )
}
