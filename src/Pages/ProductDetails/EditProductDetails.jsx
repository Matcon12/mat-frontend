import { useState } from "react"
import { Link } from "react-router-dom"
import "./ProductDetails.css"
import axios from "axios"

export default function EditProductDetails() {
  const initialFormData = {
    Prod_ID: "",
    Supp_ID: "",
    Prod_Desc: "",
    Spec_ID: "",
    Pack_Size: "",
    Currency: "",
    Price: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const getProductDetails = (e) => {
    e.preventDefault()
    axios
      .get("http://127.0.0.1:8000/purchase_order/getProductDetails", {
        params: {
          Prod_ID: formData.Prod_ID,
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

  return (
    <div className="addProductDetails-complete-container">
      <div className="addProductDetails-header-container">
        <h1>Edit Product Details</h1>
        <Link to="/add_product_details">New Product</Link>
      </div>
      <div className="addProductDetails-form-container">
        <form>
          <div>
            <input
              type="text"
              required={true}
              name="Prod_ID"
              value={formData.Prod_ID}
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
              name="Supp_ID"
              value={formData.Supp_ID}
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
              name="Prod_Desc"
              value={formData.Prod_Desc}
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
              name="Spec_ID"
              value={formData.Spec_ID}
              onChange={handleChange}
            />
            <label alt="Enter the Spec ID" placeholder="Spec ID"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Pack_Size"
              value={formData.Pack_Size}
              onChange={handleChange}
            />
            <label alt="Enter the Pack Size" placeholder="Pack Size"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Currency"
              value={formData.Currency}
              onChange={handleChange}
            />
            <label alt="Enter the Currency" placeholder="Currency"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="Price"
              value={formData.Price}
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
