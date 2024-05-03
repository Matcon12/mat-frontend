import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import './CompletePage.css';

export default function CompletePage() {
  return (
    <div className="container">
      <Navbar />
      <div className="sidebar-and-content">
        <Outlet />
      </div>
    </div>
  );
}