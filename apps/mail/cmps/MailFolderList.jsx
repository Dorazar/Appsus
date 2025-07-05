export function MailFolderList({ onSetFilterBy }) {
  function onSelectFolderFilter(folderType) {
    onSetFilterBy((prevFilter) => ({ ...prevFilter, folder: folderType }))
  }

  return (
    <section className="side-filter">
      <span className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('inbox')}>
        inbox
      </span>
      <span className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('sent')}>
        send
      </span>
      <span className="material-symbols-outlined icon-btn" onClick={() => onSelectFolderFilter('trash')}>
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
