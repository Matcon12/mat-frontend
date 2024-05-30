import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ isAuth }) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default ProtectedRoute
