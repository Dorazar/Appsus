export function MailFolderList({ onSetFilterBy }) {
  function onSelectFolderFilter(folderType) {
    onSetFilterBy((prevFilter) => ({ ...prevFilter, folder: folderType }))
  }

  return (
    <section className="side-filter">
      <span className="material-symbols-outlined" onClick={() => onSelectFolderFilter('inbox')}>
        inbox
      </span>
      <span className="material-symbols-outlined" onClick={() => onSelectFolderFilter('sent')}>
        send
      </span>
      <span className="material-symbols-outlined" onClick={() => onSelectFolderFilter('trash')}>
        delete
      </span>
      <span className="material-symbols-outlined" onClick={() => onSelectFolderFilter('draft')}>
        text_snippet
      </span>
      <span className="material-symbols-outlined" onClick={() => onSelectFolderFilter('stared')}>
        star
      </span>
    </section>
  )
}
