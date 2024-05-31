import { useState } from "react"
import { Link } from "react-router-dom"
import "./ProductDetails.css"
import api from "../../api/api.jsx"

export default function EditProductDetails() {
  const initialFormData = {
    prod_id: "",
    supp_id: "",
    prod_desc: "",
    spec_id: "",
    pack_size: "",
    currency: "",
    price: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const getProductDetails = (e) => {
    e.preventDefault()
    api
      .get("/getProductDetails", {
        params: {
          prod_id: formData.prod_id,
        },
      })
      .then((response) => {
        console.log(response.data)
        setFormData(response.data)
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .put("/updateProductDetails", {
        formData,
      })
      .then((response) => {
        console.log(response)
        // resetForm()
      })
      .catch((error) => {
        console.error("Error updating data: ", error)
      })
  }

  return (
    <div className="addProductDetails-complete-container">
      <div className="addProductDetails-header-container">
        <h1>Edit Product Details</h1>
        <Link to="/add_product_details">New Product</Link>
      </div>
      <div className="addProductDetails-form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              required={true}
              name="prod_id"
              value={formData.prod_id}
              onChange={handleChange}
            />
            <label alt="Enter the Product ID" placeholder="Product ID"></label>
          </div>
          <div className="get-data-container">
            <button onClick={getProductDetails} className="get-data-button">
              Get Data
            </button>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="supp_id"
              value={formData.supp_id}
              onChange={handleChange}
            />
            <label
              alt="Enter the Supplier ID"
              placeholder="Supplier ID"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="prod_desc"
              value={formData.prod_desc}
              onChange={handleChange}
            />
            <label
              alt="Enter the Prod Description"
              placeholder="Product Description"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="spec_id"
              value={formData.spec_id}
              onChange={handleChange}
            />
            <label alt="Enter the Spec ID" placeholder="Spec ID"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="pack_size"
              value={formData.pack_size}
              onChange={handleChange}
            />
            <label alt="Enter the Pack Size" placeholder="Pack Size"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            />
            <label alt="Enter the Currency" placeholder="Currency"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <label alt="Enter the Price" placeholder="Price"></label>
          </div>
          <button type="submit">UPDATE PRODUCT</button>
        </form>
      </div>
    </div>
  )
}
