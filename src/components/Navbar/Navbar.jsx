import "./Navbar.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"
import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { hash, pathname, search } = location

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="navbar">
        <img src="/image001.jpg" alt="" />
        {pathname !== "/login" ?
          <ul>
            <li>
              <a onClick={handleGoBack}>Back</a>
            </li>
            <li>
              {user ? (
                <Link to="/login" onClick={logout}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul> : null}
      </div>
    </>
  )
}
