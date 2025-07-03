
export function MailFolderList({ onSetFilterBy}) {

  function onSelectFolderFilter(folderType) {
    onSetFilterBy({ folder: folderType })
  }
  return (
    <section className="side-filter">
      <button onClick={() => onSelectFolderFilter('trash')}>Trash</button>
      <button>c</button>
    </section>
  )
}