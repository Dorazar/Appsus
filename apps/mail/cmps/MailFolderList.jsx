
export function MailFolderList({ onSetFilterBy}) {

  function onSelectFolderFilter(folderType) {
   onSetFilterBy(prevFilter => ({ ...prevFilter, folder: folderType }))
  }
  return (
    <section className="side-filter">
    <button onClick={() => onSelectFolderFilter('inbox')}>Inbox</button>
    <button onClick={() => onSelectFolderFilter('sent')}>Sent</button>
      <button onClick={() => onSelectFolderFilter('trash')}>Trash</button>
       <button onClick={() => onSelectFolderFilter('draft')}>Draft</button>
    </section>
  )
}