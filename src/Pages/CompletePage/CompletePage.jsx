import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import './CompletePage.css';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

export default function CompletePage() {
  return (
    <div className="container">
      <Navbar />
      <div className="sidebar-and-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}