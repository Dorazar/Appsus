const { useRef, useEffect, useState, Fragment } = React

export function MailFolderList({onSetFilterBy,defaultFilter}) {
    
    const [folderFilter,setFolderFilter]=useState(defaultFilter)
    
    useEffect(()=>{
        onSetFilterBy(folderFilter)
    },[folderFilter])

    function onSelectFolderFilter(folderType) {
        setFolderFilter((prevFilter => ({...prevFilter,folder:folderType})))
    }
    return (<section className="side-filter">
        <button onClick={()=>onSelectFolderFilter('trash')}>Trash</button>
      
        <button>c</button>
       </section>)
}