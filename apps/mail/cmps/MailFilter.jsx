import { MailFolderList } from './MailFolderList.jsx'

const { useRef, useEffect, useState, Fragment } = React

export function MailFilter({ onSetFilterBy, defaultFilter  }) {
  const [editFilterBy, setEditFilterBy] = useState(defaultFilter)
  const { txt } = editFilterBy

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

  // console.log('editFilterBy', editFilterBy)
  return (
    <Fragment>
      <section className="upper-filter">

        <section className="logo-and-search">
        <img className="mail-logo" src="assets\css\imgs\Gmail_icon_(2020).svg" alt="" />
        <input onChange={handleChange} value={txt} type="text" name="txt" placeholder="Search mails" />
       </section>
    
          <section className='sorting-section'>
           <select name="read" onChange={handleChange}>
            <option value="">All mails</option>
            <option value="1">Read</option>
            <option value="0">Unread</option>
          </select>

              <button name="sort" value="createdAt" onClick={handleChange}>
            Sort by date
          </button>
          <button name="sort" value="from" onClick={handleChange}>
            Sort by Sender
          </button>
          <button name="sort" value="subject" onClick={handleChange}>
            Sort by subject
          </button>
          </section>
        
       
      </section>
      <MailFolderList onSetFilterBy={setEditFilterBy} />
    </Fragment>
  )
}
