import axios from "axios"

const api = axios.create({
  baseURL: "http://34.235.114.144:8000/purchase_order",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
