import React, { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import api from "../api/api.jsx"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      api
        .get("/test_token", {
          headers: { Authorization: `token ${token}` },
        })
        .then((response) => {
          const data = response.data
          if (data.valid) {
            setUser({ token, ...data.userDetails })
          } else {
            localStorage.removeItem("jwt")
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error)
          localStorage.removeItem("jwt")
        })
    }
  }, [])

  const signup = async (credentials) => {
    api
      .post("/signup", credentials)
      .then((response) => {
        if (response.statusText) {
          console.log(response.data)
          localStorage.setItem("jwt", response.data.token)
          setUser({ token: response.data.token, ...response.data.user })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const login = async (credentials) => {
    api
      .post("/login", credentials)
      .then((response) => {
        const data = response
        console.log("data", data)
        if (response.statusText) {
          localStorage.setItem("jwt", data.token)
          setUser({ token: data.token, ...data.user })
          navigate("/", { replace: true })
        } else {
          console.error(data.message)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const logout = () => {
    api
      .post("/logout", {
        headers: {
          Authorization: `token ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        if (response.statusText) {
          console.log(response.data)
          setUser()
        }
      })
      .catch((error) => {
        console.error(error)
      })
    localStorage.removeItem("jwt")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
