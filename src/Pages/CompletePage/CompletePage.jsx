import Navbar from "../../components/Navbar/Navbar";
import Header from '../../components/Header/Header';
import {Outlet} from 'react-router-dom';
import './CompletePage.css';

export default function CompletePage() {
  return (
    <div className="container">
      {/* <Header/> */}
      <Navbar/>
      <div className="sidebar-and-content">
        <Outlet/>
      </div>
    </div>
  );
}