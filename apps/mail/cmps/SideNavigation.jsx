
const {useNavigate} = ReactRouterDOM

export function SideNavigation() {
    
const navigate = useNavigate()

     return (
    <section className="side-filter">
 
    <span className="material-symbols-outlined icon-btn" onClick={() => navigate('/mail?folder=inbox')}>inbox</span>
    <span className="material-symbols-outlined icon-btn" onClick={() => navigate('/mail?folder=sent')}>send</span>
      <span className="material-symbols-outlined icon-btn" onClick={() => navigate('/mail?folder=trash')}>delete</span>
       <span className="material-symbols-outlined icon-btn" onClick={() => navigate('/mail?folder=draft')}>text_snippet</span>
       <span className="material-symbols-outlined icon-btn" onClick={() => navigate('/mail?folder=stared')}>star</span>
    </section>
  )
}