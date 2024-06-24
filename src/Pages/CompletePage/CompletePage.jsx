import "./CompletePage.css"
import { useAuth } from "../../context/AuthContext"

export default function CompletePage() {
  const { user } = useAuth()
  console.log(user)
  return (
    <div className="container">
      {user ? <p>Homepage</p> : <p>Signin to continue</p>}
    </div>
  )
}
