import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <>
      <div className="navbar">
        <img src="/image001.jpg" alt="" />
        <ul>
          <li><Link to="/invoice_generation">Back</Link></li>
          <li><Link to="/invoice_generation">Signout</Link></li>
        </ul>
      </div>
    </>
  )
}