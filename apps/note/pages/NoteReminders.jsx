import { NoteHeader } from "../cmps/NoteHeader"
import { NoteNav } from "../cmps/NoteNav"

const { useNavigate } = ReactRouterDOM

export function NoteReminders() {

    const navigate = useNavigate()
    return (
        <div className="main-notes-layout">
            <NoteHeader>
                <form onClick={() => navigate('/note/search')}
                    className="note-filter"
                >
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                    />

                </form>
            </NoteHeader>


            <div className="layout-container">

                <NoteNav />

                <section className="reminders-container">
                
                <span style={{ fontSize: '160px',color:'#e5e5e5' }} className="material-symbols-outlined">
                        notifications
                    </span>
                    <div className="empty-reminder">
                        Notes with notifications displayed here
                    </div>

                </section>
            </div>
        </div>
    )
}