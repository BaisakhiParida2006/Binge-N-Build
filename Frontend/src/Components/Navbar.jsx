import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Dashboard',      path: '/dashboard' },
  { label: 'Subscriptions',  path: '/dashboard#subscriptions' },
  { label: 'Warnings',       path: '/dashboard#warnings' },
]

export default function Navbar({ userName = 'Arjun' }) {
  const navigate  = useNavigate()
  const location  = useLocation()

  return (
    <aside className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>SubTrack</div>

      <nav className="navbar-links">
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.path}
            className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar-footer">
        <div className="navbar-avatar">{userName[0].toUpperCase()}</div>
        <div className="navbar-user-info">
          <div className="navbar-username">{userName}</div>
          <div
            className="navbar-logout"
            onClick={() => navigate('/login')}
          >
            Log out
          </div>
        </div>
      </div>
    </aside>
  )
}
