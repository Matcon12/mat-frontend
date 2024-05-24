import "./CustomerDetails.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function AddCustomerDetails() {
  const initialFormData = {
    Cust_ID: "",
    Cust_Name: "",
    Cust_addr1: "",
    Cust_addr2: "",
    Cust_City: "",
    Cust_St_Code: "",
    Cust_St_Name: "",
    Cust_PIN: "",
    Cust_GST_ID: "",
    Phone_Num: "",
    Email: "",
  }
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        "http://127.0.0.1:8000/purchase_order/addCustomerDetails",
        {
          formData: formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        resetForm()
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  return (
    <div className="addCustomerDetails-complete-container">
      <div className="addCustomerDetails-header-container">
        <h1>Add Customer Details</h1>
        <Link to="/edit_customer_details">Edit</Link>
      </div>
      <div className="addCustomerDetails-form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_ID"
              value={formData.Cust_ID}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer ID"
              placeholder="Customer ID"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_Name"
              value={formData.Cust_Name}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer Name"
              placeholder="Customer Name"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_addr1"
              value={formData.Cust_addr1}
              onChange={handleChange}
            />
            <label alt="Enter the Address 1" placeholder="Address 1"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_addr2"
              value={formData.Cust_addr2}
              onChange={handleChange}
            />
            <label alt="Enter the Address 2" placeholder="Address 2"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_City"
              value={formData.Cust_City}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer City"
              placeholder="Customer City"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_St_Code"
              value={formData.Cust_St_Code}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer State Code"
              placeholder="Customer State Code"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_St_Name"
              value={formData.Cust_St_Name}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer State Name"
              placeholder="Customer State Name"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_PIN"
              value={formData.Cust_PIN}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer PIN"
              placeholder="Customer PIN"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Cust_GST_ID"
              value={formData.Cust_GST_ID}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer GST ID"
              placeholder="Customer GST ID"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Phone_Num"
              value={formData.Phone_Num}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer Phone Number"
              placeholder="Customer Phone Number"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer Email"
              placeholder="Customer Email"
            ></label>
          </div>
          <div></div>
          <button type="submit">ADD CUSTOMER</button>
        </form>
      </div>
    </div>
  )
}
