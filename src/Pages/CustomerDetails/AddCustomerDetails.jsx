import "./CustomerDetails.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../../api/api.jsx"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent.jsx"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function AddCustomerDetails() {
  const [stateData, setStateData] = useState()
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    api.get("/getStateData").then((response) => {
      let state_data = response.data.state_data
      setStateData(state_data)
    })
  }, [])

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
    contact_name_1: "",
    contact_phone_1: "",
    contact_email_1: "",
    contact_name_2: "",
    contact_phone_2: "",
    contact_email_2: "",
    gst_exemption: "0",
  }

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    setFilteredData(stateData)
  }, [stateData])

  useEffect(() => {
    formData.Cust_St_Name != ""
      ? setFormData((prevFormData) => ({
          ...prevFormData,
          Cust_St_Code: stateData?.find(
            (state) => state.state_name === formData.Cust_St_Name
          )?.state_code,
        }))
      : setFormData((prevFormData) => ({
          ...prevFormData,
          Cust_St_Code: "",
        }))
  }, [formData.Cust_St_Name, stateData])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

    if (name === "Cust_St_Name") {
      const filtered = stateData.filter((suggestion) =>
        suggestion.state_name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("formData: ", formData)
      api
        .post("/addCustomerDetails", {
          formData: formData,
        })
        .then((response) => {
          console.log(response.data)
          resetForm()
          toast.success("Added Customer Successfully!!")
        })
        .catch((error) => {
          console.log(error.response.data.error)
          toast.error("Error")
        })
    } else {
      console.log(formErrors.Cust_PIN)
      console.log("validation error")
    }
  }

  const [formErrors, setFormErrors] = useState({
    Cust_PIN: "",
    Cust_GST_ID: "",
    contact_phone_1: "",
    contact_phone_2: "",
  })

  const validateForm = () => {
    let valid = true
    const errors = {
      Cust_PIN: "",
      Cust_GST_ID: "",
      contact_phone_1: "",
      contact_phone_2: "",
    }

    //validation for Pincode
    if (formData.Cust_PIN && !/^\d{6}$/.test(formData.Cust_PIN)) {
      errors.Cust_PIN = "City PIN must be exactly 6 digits"
      valid = false
    }

    //validation for GST ID
    if (
      formData.Cust_GST_ID &&
      !/^[A-Za-z0-9]{15}$/.test(formData.Cust_GST_ID)
    ) {
      errors.Cust_GST_ID = "GST ID must be exactly 15 alphanumeric characters"
      valid = false
    }

    //validation for phone number 1
    if (
      formData.contact_phone_1 &&
      !/^\d{10}$/.test(formData.contact_phone_1)
    ) {
      errors.contact_phone_1 = "Phone number must be exactly 10 digits"
      valid = false
    }

    //validation for phone number 2
    if (
      formData.contact_phone_2 &&
      !/^\d{10}$/.test(formData.contact_phone_2)
    ) {
      errors.contact_phone_2 = "Phone number must be exactly 10 digits"
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  return (
    <div className="addCustomerDetails-complete-container">
      <div className="addCustomerDetails-header-container">
        <h1>Add Customer Details</h1>
        <Link to="/edit_customer_details">Edit</Link>
      </div>
      <div className="addCustomerDetails-form-container">
        <form onSubmit={handleSubmit} autoComplete="false">
          <div className="only-inputs">
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_ID"
                value={formData.Cust_ID}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Customer ID"
                placeholder="Customer ID"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_Name"
                value={formData.Cust_Name}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Customer Name"
                placeholder="Customer Name"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_addr1"
                value={formData.Cust_addr1}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Address 1" placeholder="Address 1"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_addr2"
                value={formData.Cust_addr2}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Address 2" placeholder="Address 2"></label>
            </div>
            <div className="autocomplete-wrapper">
              <AutoCompleteComponent
                data={stateData}
                mainData={formData}
                setData={setStateData}
                setMainData={setFormData}
                handleChange={handleChange}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                name="Cust_St_Name"
                placeholder="State Name"
                search_value="state_name"
              />
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_St_Code"
                value={formData.Cust_St_Code}
                onChange={handleChange}
                placeholder=" "
                readOnly
              />
              <label
                alt="Enter the Customer State Code"
                placeholder="St. Code"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_City"
                value={formData.Cust_City}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Customer City" placeholder="City"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_PIN"
                value={formData.Cust_PIN}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Customer PIN" placeholder="PIN"></label>
              {formErrors.Cust_PIN && (
                <span className="error">{formErrors.Cust_PIN}</span>
              )}
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Cust_GST_ID"
                value={formData.Cust_GST_ID}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Customer GST ID"
                placeholder="GSTIN"
              ></label>
              {formErrors.Cust_GST_ID && (
                <span className="error">{formErrors.Cust_GST_ID}</span>
              )}
            </div>
            <div className="input-container">
              <select
                name="gst_exemption"
                value={formData.gst_exemption}
                onChange={handleChange}
                // required
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              <label alt="Select an Option" placeholder="Gst Exemption"></label>
            </div>
            <div className="grid-column-1">
              <input
                type="text"
                // required={true}
                name="contact_name_1"
                value={formData.contact_name_1}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Contact Name 1"
                placeholder="Contact Name 1"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="contact_phone_1"
                value={formData.contact_phone_1}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Contact Phone Number 1"
                placeholder="Contact Phone 1"
              ></label>
              {formErrors.contact_phone_1 && (
                <span className="error">{formErrors.contact_phone_1}</span>
              )}
            </div>
            <div className="grid-column-2">
              <input
                type="text"
                // required={true}
                name="contact_email_1"
                value={formData.contact_email_1}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Contact Email 1"
                placeholder="Contact Email 1"
              ></label>
            </div>
            <div className="grid-column-1">
              <input
                type="text"
                // required={true}
                name="contact_name_2"
                value={formData.contact_name_2}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Contact Name 2"
                placeholder="Contact Name 2"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="contact_phone_2"
                value={formData.contact_phone_2}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Contact Phone Number 2"
                placeholder="Contact Phone 2"
              ></label>
              {formErrors.contact_phone_2 && (
                <span className="error">{formErrors.contact_phone_2}</span>
              )}
            </div>
            <div className="grid-column-2">
              <input
                type="text"
                // required={true}
                name="contact_email_2"
                value={formData.contact_email_2}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Contact Email 1"
                placeholder="Contact Email 1"
              ></label>
            </div>
          </div>
          <div className="customer-add-button-container">
            <button type="submit">ADD CUSTOMER</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
