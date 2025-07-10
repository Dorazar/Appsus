const { Link, useNavigate, useLocation } = ReactRouterDOM

export function AppHeader() {
  const navigate = useNavigate()
  const location = useLocation()

  const isMailPage = location.pathname.startsWith('/mail')
  const isNotePage = location.pathname.startsWith('/note')
  const isHome = location.pathname === '/'

  function onMailNav(link) {
    navigate(link)
  }

  return (
    <section className="app-header">
      
      <Link onClick={() => onMailNav('/')} to="/">
  
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#fafafa" d="M22.586,4.414L5.879,21.121C5.316,21.684,5,22.447,5,23.243V41c0,1.105,0.895,2,2,2h34 c1.105,0,2-0.895,2-2V23.243c0-0.796-0.316-1.559-0.879-2.121L25.414,4.414C24.633,3.633,23.367,3.633,22.586,4.414z"></path><path fill="#43a047" d="M12 35H36V43H12z"></path><path fill="#fbc02d" d="M13,24v19H7c-1.1,0-2-0.9-2-2V24H13z"></path><path fill="#1e88e5" d="M42.12,21.12L29.59,8.59l-5.55,5.55L35,25.1V43h6c1.1,0,2-0.9,2-2V23.24 C43,22.45,42.68,21.68,42.12,21.12z"></path><path fill="#e64a19" d="M29.59,8.59L5,33.18v-9.94c0-0.79,0.32-1.56,0.88-2.12L22.59,4.41c0.78-0.78,2.04-0.78,2.82,0 L29.59,8.59z"></path>
</svg>
      </Link>
      <nav>
        {(isNotePage|| isHome) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="52 42 88 66"
            onClick={() => onMailNav('/mail')}
          >
            <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
            <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
            <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
            <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
            <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
          </svg>
        )}

        {(isMailPage || isHome) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 88"
            onClick={() => onMailNav('/note')}
          >
            <path d="M 42,22 54.065,24.28 64,22 42,0 38.965,10.43 Z" fill="#f29900" />
            <path
              d="M 42,22 V 0 H 6 C 2.685,0 0,2.685 0,6 v 76 c 0,
             3.315 2.685,6 6,6 h 52 c 3.315,0 6,-2.685 6,-6 V 22 Z"
              fill="#fbbc04"
            />
            <path
              d="M 39,64 H 25 V 59 H 39 Z M 38.92501,54 H 25.075 C 21.425,51.7 19,47.635 19,43 c 0,
            -7.18 5.82,-13 13,-13 7.18,0 13,5.82 13,13 0,4.635 -2.425,8.7 -6.075,11 z"
              fill="#fff"
            />
          </svg>
        )}
      </nav>
    </section>
  )
}
