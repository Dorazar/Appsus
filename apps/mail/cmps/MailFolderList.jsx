
const { useParams, useNavigate,useOutletContext } = ReactRouterDOM
export function MailFolderList({ onSetFilterBy,unreadMails}) {

  const navigate=useNavigate()

  

   function onSelectFolderFilter(folderType) {
    
    onSetFilterBy({ folder: folderType})
   
    navigate(`/mail/?folder=${folderType}`)
  }

  return (
    <section className="side-filter">
      <button className="filter-type-title" onClick={() => onSelectFolderFilter('inbox')}>
        <span title="inbox" className="material-symbols-outlined icon-btn" >
        inbox
      </span>
        Inbox
        <span>
          {unreadMails === 0 ? '' : unreadMails}
        </span>
      </button>
         <button className="filter-type-title" onClick={() => onSelectFolderFilter('stared')}>
      <span className="material-symbols-outlined icon-btn">
        star
      </span>
      Starred 
       </button>
      <button className="filter-type-title" onClick={() => onSelectFolderFilter('sent')}>
      <span  className="material-symbols-outlined icon-btn" >
        send
      </span>
      Sent
      </button >
        <button className="filter-type-title" onClick={() => onSelectFolderFilter('draft')}>
      <span className="material-symbols-outlined icon-btn">
        text_snippet
      </span>
      Draft
      </button>
      <button className="filter-type-title" onClick={() => onSelectFolderFilter('trash')}>
      <span title="trash"className="material-symbols-outlined icon-btn" >
        delete
      </span>
      Trash
      </button>
    
   
    </section>
  )
}
