import { noteService } from '../services/note.service.js'

const { useRef, useEffect, useState, Fragment } = React

const { useParams, useNavigate, Link, Outlet, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

   function loadNotes() {
      noteService.query().then((notes) => setNotes(notes))
    }

    if (!notes || notes.length===0) return <div>Loading...</div> 
    
    return <section className="container">Notes app
    
    
    </section>
}
