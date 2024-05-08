import './Sidebar.css';
import { Link } from 'react-router-dom';
// import CreateProductList from '../../reuse/CreateProductList';

export default function Sidebar() {
  // const handleExistingDataClick = (index) => {
  //   position(index)
  //   console.log('clicked')
  // }
  return (
    // <div className="sidebar-container">
    //   <h3>Previous Entries</h3>
    //   {existingFormData[0]?
    //   <ul>
    //     {
    //       existingFormData.map((data,index)=>(
    //         <li key={index} onClick={()=>handleExistingDataClick(index)}>
    //           <span>{data.poSlNo}</span>
    //         </li>
    //       ))
    //     }
    //   </ul>:
    //   <p>Not Available</p>
    //   }
    // </div>
    <div className="sidebar-container">

      <ul>
        <li><Link to="/purchase_order">Purchase Order</Link></li>
        <li><Link to="/invoice_generation">Invoice Generation</Link></li>
        <li><Link to="/invoice_generation">Customer Details</Link></li>
        <li><Link to="/invoice_generation">Dummy</Link></li>
      </ul>
    </div>
  )
}