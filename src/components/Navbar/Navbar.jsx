import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar(){

  return (
    <>
    <div className="navbar">
      <img src="/image001.jpg" alt="" />
      <ul>
        <li><Link to="/purchase_order">Purchase Order</Link></li>
        <li><Link to="/invoice_generation">Invoice Generation</Link></li>
        <li><Link to="/invoice_generation">Dummy</Link></li>
        <li><Link to="/invoice_generation">Dummy</Link></li>
      </ul>
      <ul>
        <li><Link to="/invoice_generation">Back</Link></li>
        <li><Link to="/invoice_generation">Signout</Link></li>
      </ul>
    </div>
    </>
  )
}