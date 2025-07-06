
const { useParams, useNavigate,useOutletContext } = ReactRouterDOM
export function MailFolderList({ onSetFilterBy}) {

  const navigate=useNavigate()


   function onSelectFolderFilter(folderType) {
    onSetFilterBy({ folder: folderType })
    navigate(`/mail/?folder=${folderType}`)
  }

  return (
    <section className="side-filter">
      <span title="inbox" className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('inbox')}>
        inbox
      </span>
      <span  className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('sent')}>
        send
      </span>
      <span title="trash"className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('trash')}>
        delete
      </span>
      <span className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('draft')}>
        text_snippet
      </span>
      <span className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('stared')}>
        star
      </span>
    </section>
  )
}
