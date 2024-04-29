import './Sidebar.css';
import PropTypes from 'prop-types';
// import CreateProductList from '../../reuse/CreateProductList';

export default function Sidebar({existingFormData, position}) {
  const handleExistingDataClick = (index) => {
    position(index)
    console.log('clicked')
  }
  return (
    <div className="sidebar-container">
      <h3>Previous Entries</h3>
      {existingFormData[0]?
      <ul>
        {
          existingFormData.map((data,index)=>(
            <li key={index} onClick={()=>handleExistingDataClick(index)}>
              <span>{data.poSlNo}</span>
            </li>
          ))
        }
      </ul>:
      <p>Not Available</p>
      }
    </div>
  )
}

Sidebar.propTypes = {
  existingFormData: PropTypes.array.isRequired,
  position: PropTypes.func.isRequired
}