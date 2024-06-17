import axios from "axios"

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/purchase_order",
  // baseURL: "http://0.0.0.0:8000/purchase_order",
  // baseURL: "http://0.0.0.0:8000/purchase_order",
  baseURL: "http://34.203.221.137:8000/purchase_order",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
