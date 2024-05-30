import React, { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      // Verify token and set user state (same as above)
      fetch("http://127.0.0.1:8000/purchase_order/test_token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
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
    axios
      .post("http://127.0.0.1:8000/purchase_order/signup", credentials)
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
    // Handle login (same as above)
    const response = await fetch("http://127.0.0.1:8000/purchase_order/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    if (response.ok) {
      localStorage.setItem("jwt", data.token)
      setUser({ token: data.token, ...data.user })
      navigate("/", { replace: true })
    } else {
      console.error(data.message)
    }
  }

  const logout = () => {
    axios
      .post(
        "http://127.0.0.1:8000/purchase_order/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.getItem("jwt")}`,
          },
        }
      )
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
