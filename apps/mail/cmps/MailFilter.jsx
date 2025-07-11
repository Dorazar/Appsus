import { MailFolderList } from './MailFolderList.jsx'
import { utilService } from '../../../services/util.service.js'

const { useRef, useEffect, useState, Fragment } = React
const { useNavigate } = ReactRouterDOM

export function MailFilter({ onSetFilterBy, defaultFilter }) {
  const [editFilterBy, setEditFilterBy] = useState(defaultFilter)
  const { txt } = editFilterBy

  const navigate = useNavigate()
  // const gMailLogo = useRef()
  // const gKeepLogo = useRef()

  useEffect(() => {
    //  console.log(defaultFilter)
    setEditFilterBy((prevFilter) => ({ ...prevFilter }, editFilterBy))
    // console.log(editFilterBy)
  }, [defaultFilter])

  useEffect(() => {
    onSetFilterBy(editFilterBy)
  }, [editFilterBy])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    setEditFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSortChange(sortBy) {
    setEditFilterBy((prevFilter) => ({ ...prevFilter, sort: sortBy }))
  }

  // console.log('editFilterBy', editFilterBy)
  return (
    <Fragment>
      <section className="upper-filter">
        <section className="logo-and-search">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="52 42 88 66"
          
             onMouseOver={()=>utilService.animateCSS(gMailLogo.current)}
            onClick={() => {
              navigate('/mail')
              
            }}
          >
            <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
            <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
            <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
            <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
            <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
          </svg>
        */}
          <input onChange={handleChange} value={txt} type="text" name="txt" placeholder="Search mail" />
          
        </section>

       
      </section>
       <section className="sorting-section">
          <select name="read" onChange={handleChange}>
            <option value="">All mails</option>
            <option value="1">Read</option>
            <option value="0">Unread</option>
          </select>

          <button name="sort" value="createdAt" onClick={() => onSortChange('createdAt')}>
            Sort by date
          </button>
          <button name="sort" value="from" onClick={() => onSortChange('from')}>
            Sort by Sender
          </button>
          <button name="sort" value="subject" onClick={() => onSortChange('subject')}>
            Sort by subject
          </button>
        </section>
        <img className='mailLogo' src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="" onClick={()=>navigate('/mail')}/>
    </Fragment>
  )
}
