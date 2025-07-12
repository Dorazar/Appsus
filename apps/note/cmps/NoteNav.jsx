
const {  useNavigate } = ReactRouterDOM
export function NoteNav(){

    const navigate = useNavigate()
    
    return(
    <aside className="notes-nav-area">
                        <div  className="nav-icon-background">
                            <span style={{ fontSize: '36px' }} onClick={() => navigate('/note')}
                                className="material-symbols-outlined nav-icon clicked">
                                lightbulb_2
                            </span>
                        </div>
                    </aside>
    )
}