import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ProductDetails.css"
import api from "../../api/api.jsx"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function AddProductDetails() {
  const initialFormData = {
    Prod_ID: "",
    Supp_ID: "",
    Prod_Desc: "",
    Spec_ID: "",
    Pack_Size: "",
    Currency: "",
    Price: "",
    hsn_code: "",
  }

  const PackSizeBreakup = {
    pack_size: "",
    uom: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [packSize, setPackSize] = useState(PackSizeBreakup)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handlePackSizeChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setPackSize({ ...packSize, [name]: value })
  }

  useEffect(() => {
    console.log("entered")
    setFormData({
      ...formData,
      Pack_Size: packSize.pack_size + " " + packSize.uom,
    })
  }, [packSize.pack_size, packSize.uom])

  console.log(formData)

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("formData: ", formData)
    api
      .post("/addProductDetails", { formData })
      .then((response) => {
        console.log(response.data)
        toast.success("Successfully added product!!")
        resetForm()
      })
      .catch((error) => {
        console.log(error.response.data.error)
        toast.error("Error submitting the form")
      })
  }

  return (
    <div className="addProductDetails-complete-container">
      <div className="addProductDetails-header-container">
        <h1>Add Product Details</h1>
        <Link to="/edit_product_details">Edit</Link>
      </div>
      <div className="addProductDetails-form-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="only-inputs">
            <div>
              <input
                type="text"
                // required={true}
                name="Prod_ID"
                value={formData.Prod_ID}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Product ID"
                placeholder="Product ID"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Supp_ID"
                value={formData.Supp_ID}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Supplier ID"
                placeholder="Supplier ID"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Prod_Desc"
                value={formData.Prod_Desc}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                alt="Enter the Prod Description"
                placeholder="Product Description"
              ></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Spec_ID"
                value={formData.Spec_ID}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Spec ID" placeholder="Spec ID"></label>
            </div>
            <div className="pack_size_uom">
              <div>
                <input
                  type="text"
                  // required={true}
                  name="pack_size"
                  value={packSize.pack_size}
                  onChange={handlePackSizeChange}
                  placeholder=" "
                />
                <label
                  alt="Enter the Pack Size"
                  placeholder="Pack Size"
                ></label>
              </div>
              <div className="input-container">
                <select
                  name="uom"
                  value={packSize.uom}
                  onChange={handlePackSizeChange}
                  // required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="L">L</option>
                  <option value="ML">ML</option>
                  <option value="Kg">Kg</option>
                  <option value="No.">No.</option>
                  <option value="Kit">Kit</option>
                  <option value="Doc">Doc</option>
                </select>
                <label alt="Select an Option" placeholder="UOM"></label>
              </div>
              {/* <div>
                <input
                  type="text"
                  // required={true}
                  name="Pack_Size"
                  value={formData.Pack_Size}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label
                  alt="Enter the Pack Size"
                  placeholder="Pack Size"
                ></label>
              </div> */}
            </div>
            <div>
              <input
                type="text"
                required={true}
                name="Currency"
                value={formData.Currency}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Currency" placeholder="Currency"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Price" placeholder="Price"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="hsn_code"
                value={formData.hsn_code}
                onChange={handleChange}
                placeholder=" "
              />
              <label alt="Enter the Hsn Code" placeholder="HSN"></label>
            </div>
          </div>
          <div className="product-add-button-container">
            <button type="submit">ADD PRODUCT</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
