import "./CustomerDetails.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import api from "../../api/api.jsx"

export default function EditCustomerDetails() {
  const initialFormData = {
    cust_id: "",
    cust_name: "",
    cust_addr1: "",
    cust_addr2: "",
    cust_city: "",
    cust_st_code: "",
    cust_st_name: "",
    cust_pin: "",
    cust_gst_id: "",
    phone_no: "",
    email: "",
  }
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const getCustomerDetails = () => {
    api
      .get("/getCustomerData", {
        params: { cust_id: formData.cust_id },
      })
      .then((response) => {
        console.log(response.data)
        setFormData((prevFormData) => ({
          ...prevFormData,
          cust_name: response.data.cust_name,
          cust_addr1: response.data.cust_addr1,
          cust_addr2: response.data.cust_addr2,
          cust_city: response.data.cust_city,
          cust_st_code: response.data.cust_st_code,
          cust_st_name: response.data.cust_st_name,
          cust_pin: response.data.cust_pin,
          cust_gst_id: response.data.cust_gst_id,
          phone_no: response.data.phone_no,
          email: response.data.email,
        }))
      })
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .put(
        "/updateCustomerDetails",
        { formData },
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
        console.error("Error updating data: ", error)
      })
  }
  return (
    <div className="addCustomerDetails-complete-container">
      <div className="addCustomerDetails-header-container">
        <h1>Edit Customer Details</h1>
        <Link to="/add_customer_details">New Customer</Link>
      </div>
      <div className="addCustomerDetails-form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required={true}
              name="cust_id"
              value={formData.cust_id}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer ID"
              placeholder="Customer ID"
            ></label>
          </div>
          <div className="get-data-container">
            <button
              type="button"
              onClick={getCustomerDetails}
              className="get-data-button"
            >
              Get Data
            </button>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="cust_name"
              value={formData.cust_name}
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
              name="cust_addr1"
              value={formData.cust_addr1}
              onChange={handleChange}
            />
            <label alt="Enter the Address 1" placeholder="Address 1"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="cust_addr2"
              value={formData.cust_addr2}
              onChange={handleChange}
            />
            <label alt="Enter the Address 2" placeholder="Address 2"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="cust_city"
              value={formData.cust_city}
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
              name="cust_st_code"
              value={formData.cust_st_code}
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
              name="cust_st_name"
              value={formData.cust_st_name}
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
              name="cust_pin"
              value={formData.cust_pin}
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
              name="cust_gst_id"
              value={formData.cust_gst_id}
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
              name="phone_no"
              value={formData.phone_no}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label
              alt="Enter the Customer Email"
              placeholder="Customer Email"
            ></label>
          </div>
          <div></div>
          <button type="submit">UPDATE CUSTOMER</button>
        </form>
      </div>
    </div>
  )
}
