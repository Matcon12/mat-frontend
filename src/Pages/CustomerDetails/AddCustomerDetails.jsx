import "./CustomerDetails.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../../api/api.jsx"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent.jsx"

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
    gst_exception: "0"
  }

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    setFilteredData(stateData)
  }, [stateData])

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Cust_St_Code: stateData?.find(
        (state) => state.state_name === formData.Cust_St_Name
      )?.state_code,
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

  // const [isFocused, setIsFocused] = useState(false)

  // const handleFocus = () => {
  //   setIsFocused(true)
  // }

  // const handleBlur = () => {
  //   setIsFocused(false)
  // }

  // const handleSelect = (value) => {
  //   const selectedState = stateData.find(state => state.name === value);
  //   if (selectedState) {
  //     setFormData({
  //       ...formData,
  //       Cust_St_Name: selectedState.name,
  //       Cust_St_Code: selectedState.code
  //     });
  //   }
  // };

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('formData: ', formData)
    api
      .post("/addCustomerDetails", {
        formData: formData,
      })
      .then((response) => {
        console.log(response.data)
        // resetForm()
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  // const handleSuggestionClick = (suggestion) => {
  //   setFormData({
  //     ...formData,
  //     Cust_St_Name: suggestion.state_name,
  //     Cust_St_Code: suggestion.state_code
  //   });
  //   setIsFocused(false);
  // };

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
                required={true}
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
                placeholder="Customer State Name"
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
              />
              <label
                alt="Enter the Customer State Code"
                placeholder="Customer State Code"
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
              <label
                alt="Enter the Customer City"
                placeholder="Customer City"
              ></label>
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
              <label
                alt="Enter the Customer PIN"
                placeholder="Customer PIN"
              ></label>
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
                placeholder="Customer GST ID"
              ></label>
            </div>
            <div>
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
            </div>
            <div>
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
            <div>
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
            </div>
            <div>
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
    </div>
  )
}
