import { useState } from "react"
import "./Signup.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"

export default function Signup() {
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(formData)
  }

  return (
    <div className="signup-container">
      <form action="" onSubmit={handleSubmit}>
        <div className="signup-container">
          <h1>Signup</h1>
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
              type="text"
              required={true}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label alt="Enter the Password" placeholder="Password"></label>
          </div>
          <button type="submit">Signup</button>
          <div className="form-footer">
            <p>Already have an account? </p>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
