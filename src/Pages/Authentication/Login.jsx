import { useState } from "react"
import "./Signup.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"

export default function Login() {
  const [formData, setFormData] = useState({
    token: "",
    user: {
      username: "",
      password: "",
    },
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit}>
        <div className="signup-container">
          <h1>Login</h1>
          <div>
            <input
              type="text"
              required={true}
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label alt="Enter the Username" placeholder="Username"></label>
          </div>
          <div>
            <input
              type="password"
              required={true}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label alt="Enter the Password" placeholder="Password"></label>
          </div>
          <button type="submit">Login</button>
          <div className="form-footer">
            <p>New User?</p>
            <Link to="/Signup">Signup</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
