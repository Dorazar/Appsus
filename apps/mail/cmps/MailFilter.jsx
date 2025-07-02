import { MailFolderList } from './MailFolderList.jsx'

const { useRef, useEffect, useState, Fragment } = React

export function MailFilter({ onSetFilterBy, defaultFilter, onSetSortBy }) {
  const [editFilterBy, setEditFilterBy] = useState(defaultFilter)
  const { txt } = editFilterBy

  useEffect(() => {
    onSetFilterBy(editFilterBy)
  }, [editFilterBy])

  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    switch (target.type) {
      case 'number':
        
        value = +value
        break
        case "checkbox":
            value = value.checked
        break

    }
 

    setEditFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
  }



  return (
    <Fragment>
      <section className="upper-filter">
        <img className="mail-logo" src="assets\css\imgs\Gmail_icon_(2020).svg" alt="" />
        <label htmlFor="txt"></label>
        <input onChange={handleChange} value={txt} type="text" name="txt" placeholder="Search mails" />
        <section>
          <button>new mail</button>
          <select name="read" onChange={handleChange}>
            <option value="">All mails</option>
            <option value="1">Read</option>
            <option value="0">Unread</option>
          </select>
       

      
          <button>Sort by date</button>
          <button>Sort by from</button>
          <button>Sort by subject</button>
        </section>
      </section>

      <MailFolderList />
    </Fragment>
  )
}
