import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./ProductDetails.css"
import api from "../../api/api.jsx"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent.jsx"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function EditProductDetails() {
  const [productData, setProductData] = useState()
  const [filteredData, setFilteredData] = useState([])
  const initialFormData = {
    prod_id: "",
    supp_id: "",
    prod_desc: "",
    spec_id: "",
    pack_size: "",
    currency: "",
    price: "",
    hsn_code: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    api.get("/getProductData").then((response) => {
      setProductData(response.data.products)
    })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const resetForm = async () => {
    await setFormData(initialFormData)
  }

  const getProductDetails = async (e) => {
    e.preventDefault()
    api
      .get("/getProductDetails", {
        params: {
          prod_id: formData.prod_id,
        },
      })
      .then((response) => {
        // resetForm()
        console.log(response.data)
        setFormData({
          prod_id: response.data.prod_id ? response.data.prod_id : "",
          supp_id: response.data.supp_id ? response.data.supp_id : "",
          prod_desc: response.data.prod_desc ? response.data.prod_desc : "",
          spec_id: response.data.spec_id ? response.data.spec_id : "",
          pack_size: response.data.pack_size ? response.data.pack_size : "",
          currency: response.data.currency ? response.data.currency : "",
          price: response.data.price ? response.data.price : "",
          hsn_code: response.data.hsn_code ? response.data.hsn_code : "",
        })
        toast.success("Successfully fetched data!!")
      })
      .catch((error) => {
        resetForm()
        console.log(error.response.data.error)
        toast.error("Failed to fetch data")
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
        toast.success("Successfully updated the product details")
      })
      .catch((error) => {
        console.error("Error updating data: ", error)
        toast.error("Error updating the product details")
      })
  }

  return (
    <div className="addProductDetails-complete-container">
      <div className="addProductDetails-header-container">
        <h1>Edit Product Details</h1>
        <Link to="/add_product_details">New Product</Link>
      </div>
      <div className="addProductDetails-form-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="only-inputs">
            <div className="autocomplete-wrapper">
              <AutoCompleteComponent
                data={productData}
                mainData={formData}
                setData={setProductData}
                setMainData={setFormData}
                // handleChange={handleChange}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                name="prod_id"
                placeholder="Product ID"
                search_value="prod_id"
                readonly={true}
              />
            </div>
            <div className="get-data-container">
              <button onClick={getProductDetails} className="get-data-button">
                Get Data
              </button>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="supp_id"
                value={formData.supp_id}
                onChange={handleChange}
                placeholder=" "
                readOnly
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
                name="prod_desc"
                value={formData.prod_desc}
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
                name="spec_id"
                value={formData.spec_id}
                onChange={handleChange}
                placeholder=" "
                readOnly
              />
              <label alt="Enter the Spec ID" placeholder="Spec ID"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="pack_size"
                value={formData.pack_size}
                onChange={handleChange}
                placeholder=" "
                readOnly
              />
              <label alt="Enter the Pack Size" placeholder="Pack Size"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                placeholder=" "
                readOnly
              />
              <label alt="Enter the Currency" placeholder="Currency"></label>
            </div>
            <div>
              <input
                type="text"
                // required={true}
                name="price"
                value={formData.price}
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
                readOnly
              />
              <label alt="Enter the HSN code" placeholder="HSN Code"></label>
            </div>
          </div>
          <div className="product-update-button-container">
            <button type="submit">UPDATE PRODUCT</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
