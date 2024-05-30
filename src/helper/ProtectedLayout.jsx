import React from "react"
import ProtectedRoute from "./ProtectedRoute"
import { Outlet } from "react-router-dom"

const ProtectedLayout = () => {
  const isAuth = localStorage.getItem("jwt")
  return (
    <ProtectedRoute isAuth={isAuth}>
      <Outlet />
    </ProtectedRoute>
  )
}

export default ProtectedLayout
