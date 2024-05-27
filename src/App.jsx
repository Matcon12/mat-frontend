import { Routes, Route } from "react-router-dom"
import Invoice from "./Pages/Invoice/Invoice"
import Navbar from "./components/Navbar/Navbar"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Invoice />} />
      </Routes>
    </>
  )
}
