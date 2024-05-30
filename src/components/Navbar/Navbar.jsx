import "./Navbar.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="navbar">
        <img src="/image001.jpg" alt="" />
        <ul>
          <li>
            <a onClick={handleGoBack}>Back</a>
          </li>
          <li>
            {user ? (
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link to="/Login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </>
  )
}
