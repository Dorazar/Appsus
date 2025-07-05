
const {useNavigate} = ReactRouterDOM

export function SideNavigation() {
    
const navigate = useNavigate()

     return (
    <section className="side-filter">
      <span class="material-symbols-outlined">
inbox
</span>
    <button  onClick={() => navigate('/mail?folder=inbox')}>Inbox</button>
    <button onClick={() => navigate('/mail?folder=sent')}>Sent</button>
      <button onClick={() => navigate('/mail?folder=trash')}>Trash</button>
       <button onClick={() => navigate('/mail?folder=draft')}>Draft</button>
       <button onClick={() => navigate('/mail?folder=stared')}>Stared</button>
    </section>
  )
}