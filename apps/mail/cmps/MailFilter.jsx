import { MailFolderList } from './MailFolderList.jsx'

const { useRef, useEffect, useState, Fragment } = React
const {useNavigate} = ReactRouterDOM





export function MailFilter({ onSetFilterBy, defaultFilter }) {
  const [editFilterBy, setEditFilterBy] = useState(defaultFilter)
  const { txt } = editFilterBy

  const navigate = useNavigate()

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="52 42 88 66" onClick={()=>navigate('/mail')}>
            <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
            <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
            <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
            <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
            <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
          </svg>
          {/* <img className="mail-logo" src="assets\css\imgs\Gmail_icon_(2020).svg" alt="" /> */}
          <input onChange={handleChange} value={txt} type="text" name="txt" placeholder="Search mails" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 88" onClick={()=>navigate('/note')} >
            <path d="M 42,22 54.065,24.28 64,22 42,0 38.965,10.43 Z" fill="#f29900" />
            <path
              d="M 42,22 V 0 H 6 C 2.685,0 0,2.685 0,6 v 76 c 0,3.315 2.685,6 6,6 h 52 c 3.315,0 6,-2.685 6,-6 V 22 Z"
              fill="#fbbc04"
            />
            <path
              d="M 39,64 H 25 V 59 H 39 Z M 38.92501,54 H 25.075 C 21.425,51.7 19,47.635 19,43 c 0,-7.18 5.82,-13 13,-13 7.18,0 13,5.82 13,13 0,4.635 -2.425,8.7 -6.075,11 z"
              fill="#fff"
            />
          </svg>
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
      </section>
    </Fragment>
  )
}
