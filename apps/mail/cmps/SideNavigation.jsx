
const {useNavigate} = ReactRouterDOM

export function SideNavigation() {
    
const navigate = useNavigate()

     return (
    <section className="side-filter">
    <button  onClick={() => navigate('/mail?folder=inbox')}>Inbox</button>
    <button onClick={() => navigate('/mail?folder=sent')}>Sent</button>
      <button onClick={() => navigate('/mail?folder=trash')}>Trash</button>
       <button onClick={() => navigate('/mail?folder=draft')}>Draft</button>
    </section>
  )
}