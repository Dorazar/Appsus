
const { useNavigate, useLocation } = ReactRouterDOM
const { useEffect, useState } = React

export function NoteNav() {

    const navigate = useNavigate();
    const location = useLocation();
    const [clickedIcon, setclickedIcon] = useState("/note");

    // console.log(location.pathname)

    useEffect(() => {
        if (
            location.pathname === "/note" ||
            location.pathname === "/note/reminders"
        ) {
            setclickedIcon(location.pathname)
        }
    }, [location.pathname])

    function handleIconClick(path) {
        if (clickedIcon !== path) {
            setclickedIcon(path)
            navigate(path)
        }
    }

    return (
        <aside className="notes-nav-area">

            <div className="nav-icon-background">
                <span style={{ fontSize: '36px', color: '#5f6368' }}
                    onClick={() => handleIconClick("/note")}
                    className={`material-symbols-outlined nav-icon ${clickedIcon === "/note" ? "clicked" : ""}`}
                >
                    lightbulb_2
                </span>
            </div>

            <div className="nav-icon-background">
                <span style={{ fontSize: '36px', color: '#5f6368' }}
                    onClick={() => handleIconClick("/note/reminders")}
                    className={`material-symbols-outlined nav-icon ${clickedIcon === "/note/reminders" ? "clicked" : ""}`}
                >
                    notifications
                </span>
            </div>


        </aside>
    )
}