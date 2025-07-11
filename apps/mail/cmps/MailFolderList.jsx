
const { useParams, useNavigate,useOutletContext,useSearchParams } = ReactRouterDOM
const { useRef, useEffect, useState, Fragment } = React
export function MailFolderList({ onSetFilterBy,unreadMails ,activeFolder='inbox',isMini,onSetIsMini}) {


  useEffect(()=>{
onSetIsMini(editIsMini=>!editIsMini)
  },[])




//   const navigate=useNavigate()
// const [searchParams] = useSearchParams()

// const activeFolder = searchParams.get('folder') 

   function onSelectFolderFilter(folderType) {
    
    onSetFilterBy({ folder: folderType})
   
    // navigate(`/mail/?folder=${folderType}`)
  }

  return (
    <Fragment>
    <section className={`side-filter ${isMini?'mini':''}`}>
      
      <button
  className={`filter-type-title ${activeFolder === 'inbox' ? 'selected' : ''}`}
  onClick={() => onSelectFolderFilter('inbox')}
>
        <span title="inbox" className="material-symbols-outlined icon-btn" >
        inbox
      </span>
      <span className="category"> Inbox</span>
       
        <span>
          {!isMini && (unreadMails === 0 ? '' : unreadMails)}
        </span>
      </button>
        <button
  className={`filter-type-title ${activeFolder === 'stared' ? 'selected' : ''}`}
  onClick={() => onSelectFolderFilter('stared')}
>
      <span className="material-symbols-outlined icon-btn">
        star
      </span>
      <span  className="category">Starred </span>
       </button>
      <button
  className={`filter-type-title ${activeFolder === 'sent' ? 'selected' : ''}`}
  onClick={() => onSelectFolderFilter('sent')}
>
      <span  className="material-symbols-outlined icon-btn" >
        send
      </span>
      <span  className="category">Sent</span>
      </button >
     <button
  className={`filter-type-title ${activeFolder === 'draft' ? 'selected' : ''}`}
  onClick={() => onSelectFolderFilter('draft')}
>
      <span className="material-symbols-outlined icon-btn">
        text_snippet
      </span>
      <span  className="category">Draft</span>
      </button>
     <button
  className={`filter-type-title ${activeFolder === 'trash' ? 'selected' : ''}`}
  onClick={() => onSelectFolderFilter('trash')}
>
      <span title="trash"className="material-symbols-outlined icon-btn" >
        delete
      </span>
      <span  className="category">Trash</span>
      </button>
    </section>
           
          
           </Fragment>
  )
}
