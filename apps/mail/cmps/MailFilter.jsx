import { MailFolderList } from "./MailFolderList.jsx"

const { useRef, useEffect, useState, Fragment } = React

export function MailFilter() {
    return (
    
    <Fragment>
    
    <section className="upper-filter">
        
        <img className="mail-logo" src="assets\css\imgs\Gmail_icon_(2020).svg" alt="" />
        <label htmlFor="filter"></label>
        <input type="text" name="filter" placeholder="Search mails"/>
    <button>Search</button>

        <section >
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
    

        <MailFolderList/>
       </Fragment>
)
} 