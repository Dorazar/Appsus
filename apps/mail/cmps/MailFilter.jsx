import { MailFolderList } from './MailFolderList.jsx'

const { useRef, useEffect, useState, Fragment } = React

export function MailFilter({ onSetFilterBy,defaultFilter}) {

    const [editFilterBy,setEditFilterBy] = useState(defaultFilter)

    const {txt} = editFilterBy

   function handleChange({target}) {
        const field = target.name
        const value = target.value

        switch (target.type) {
            case value:'number'
                value=+value
                break;
        }
        console.log(field,value)

        setEditFilterBy(prevFilter => ({...prevFilter,[field]:value}))
        onSetFilterBy(editFilterBy)
    }

  return (
    <Fragment>
      <section className="upper-filter">
        <img className="mail-logo" src="assets\css\imgs\Gmail_icon_(2020).svg" alt="" />
        <label htmlFor="txt"></label>
        <input  onChange={handleChange} value={txt} type="text" name="txt" placeholder="Search mails" />
        <section>
          <button>new mail</button>
          <select name="" id="">
            <option value="">All mails</option>
            <option value="Read">Read</option>
            <option value="Read">Unread</option>
          </select>

          <button>Sort by date</button>
          <button>Sort by form</button>
          <button>Sort by subject</button>
        </section>
      </section>

      <MailFolderList />
    </Fragment>
  )
}
