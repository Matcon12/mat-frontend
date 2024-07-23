import { useEffect, useState } from "react"
import "./Customer.css"
import possibleValues from "../../../../data.js"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import ProductDetails from "../../../reuse/ProductDetails/ProductDetails.jsx"
import { Link } from "react-router-dom"
import api from "../../../api/api.jsx"
import AutoCompleteComponent from "../../../components/AutoComplete/AutoCompleteComponent.jsx"
import { format, addYears, parse } from "date-fns"
// import Toast from "../../../components/Toast/Toast.jsx"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function Customer() {
  const [customerData, setCustomerData] = useState(0)
  const [purchaseOrder, setPurchaseOrder] = useState()
  const [suggestions, setSuggestions] = useState([])
  const [filteredCustomerData, setFilteredCustomerData] = useState()
  const [filteredPurchaseData, setFilteredPurchaseData] = useState()
  const [filteredSuggestions, setFilteredSuggestions] = useState()

  useEffect(() => {
    api.get("/getCustomerData").then((response) => {
      setCustomerData(response.data.customerData)
    })
    api.get("/getPurchaseOrder").then((response) => {
      setPurchaseOrder(response.data.distinct_pono)
      console.log("PO: ", response.data.distinct_pono)
    })
    api.get("/getProductCodes").then((response) => {
      setSuggestions(response.data.prod_code)
      console.log("product codes: ", response.data.prod_code)
    })
  }, [])

  // useEffect(() => {
  //   setFilteredData(customerData);
  // }, [customerData]);

  // const handleCustomerSuggestionClick = (suggestion) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     customerId: suggestion.cust_id,
  //   }))
  // }

  const initialFormData = {
    customerId: "",
    customerName: "",
    poNo: "",
    poDate: null,
    poValidity: null,
    quoteId: "",
    consigneeId: "",
    consigneeName: "",
  }

  const initialProductDetails = {
    poSlNo: "",
    prodId: "",
    packSize: "",
    productDesc: "",
    msrr: "",
    // omat: "",
    uom: "",
    hsn_sac: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    deliveryDate: null,
  }

  const initialFormDataValidation = {
    customerId: "",
    customerName: "",
    poNo: "",
    poDate: "",
    poValidity: "",
    quoteId: "",
    consigneeId: "",
    consigneeName: "",
  }

  const initialProductValidation = {
    poSlNo: "",
    prodId: "",
    packSize: "",
    productDesc: "",
    additionalDesc: "",
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    deliveryDate: "",
    uom: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [productDetails, setProductDetails] = useState([initialProductDetails])
  const [psn, setPsn] = useState([])
  // const [formDataValidation, setFormDataValidation] = useState(initialFormDataValidation);
  const [productValidation, setProductValidation] = useState(
    initialProductValidation
  )

  const handleChange = async (event) => {
    const { name, value } = event.target
    // if (name === "customerId") {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: value,
    //     consigneeId: value,
    //   }))
    //   const filtered = customerData.filter(suggestion =>
    //     suggestion.cust_id.toLowerCase().includes(value.toLowerCase())
    //   );
    //   setFilteredData(filtered);
    //   return
    // }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleProductChange = (key, event) => {
    const { name, value } = event.target
    //validating PoSlNo to avoid repetition of PoSlNo
    if (name == "poSlNo") {
      setPsn((prevPsn) => [...prevPsn, value])
    }
    if (name == "quantity" && value < 0) {
      return
    }
    if (name == "unitPrice" && value < 0) {
      return
    }
    console.log(key, name)
    setProductDetails(
      productDetails.map((productDetail) => {
        if (productDetails.indexOf(productDetail) == key) {
          return {
            ...productDetail,
            [name]: ["totalPrice", "quantity", "unitPrice"].includes(name)
              ? parseFloat(value)
              : value,
          }
        }
        return productDetail
      })
    )
  }

  const handleMultipleSelectChange = (key, event) => {
    const updatedProductDetails = [...productDetails]
    updatedProductDetails[key].additionalDesc = event
    setProductDetails(updatedProductDetails)
    console.log(productDetails)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("formData: ", formData, "productDetails: ", productDetails)
    api
      .post("/submitForm", {
        formData: formData,
        productDetails: productDetails,
      })
      .then((response) => {
        console.log(response.data)
        toast.success(response.data.message)
        resetForm()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        console.log(error.response.data.error)
      })
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setProductDetails([initialProductDetails])
    setProductValidation(initialProductValidation)
  }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    setProductDetails(
      productDetails.map((productDetail) => {
        if (productDetails.indexOf(productDetail) == index) {
          return { ...productDetail, [name]: value }
        }
        return productDetail
      })
    )
    if (value.length > 0) {
      const filteredSuggestions = possibleValues.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      )
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No matches found"]
      )
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (value, index) => {
    setProductDetails(
      productDetails.map((productDetail, idx) => {
        if (idx == index) {
          return { ...productDetail, ["prodId"]: value }
        }
        return productDetail
      })
    )
    setSuggestions([])
    getPackSizeAndDesc(value, index)
  }

  const getPackSizeAndDesc = (value, index) => {
    api
      .get("/packSize", {
        params: {
          prodId: value,
        },
      })
      .then((response) => {
        setProductDetails(
          productDetails.map((productDetail, idx) => {
            if (idx === index) {
              return {
                ...productDetail,
                prodId: value,
                packSize: response.data.pack_size,
                productDesc: response.data.prod_desc,
              }
            }
            return productDetail
          })
        )
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  const onDateChange = (date, dateString) => {
    const parsedDate = parse(dateString, "dd-MM-yyyy", new Date())
    const validityDate = addYears(parsedDate, 1)
    const formattedValidityDate = format(validityDate, "dd-MM-yyyy")

    setFormData((prevFormData) => ({
      ...prevFormData,
      poDate: dateString,
      poValidity: formattedValidityDate,
    }))
  }

  const onValidityChange = (date, dateString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      poValidity: dateString,
    }))
  }

  const onProductDateChange = (date, index, dateStr) => {
    const parsedPoDate = parse(formData.poDate, "dd-MM-yyyy", new Date())
    const formattedPoDate = format(parsedPoDate, "dd-MM-yyyy")
    const parsedDeliveryDate = parse(dateStr, "dd-MM-yyyy", new Date())
    const formattedDeliveryDate = format(parsedDeliveryDate, "dd-MM-yyyy")

    setProductDetails(
      productDetails.map((productDetail, idx) => {
        if (idx === index) {
          return {
            ...productDetail,
            deliveryDate: parsedPoDate <= parsedDeliveryDate ? dateStr : "",
          }
        }
        return productDetail
      })
    )
  }

  const setTotal = (total, index) => {
    setProductDetails(
      productDetails.map((productDetail) => {
        if (productDetails.indexOf(productDetail) == index) {
          return { ...productDetail, ["totalPrice"]: parseFloat(total) }
        }
        return productDetail
      })
    )
  }

  const grandTotal = () => {
    let total = 0.0
    productDetails.forEach((productDetail) => {
      total += parseFloat(productDetail.totalPrice)
    })
    return parseFloat(total).toFixed(2)
  }

  const handleProductDelete = (index) => {
    setProductDetails(
      productDetails.filter((productDetail, idx) => idx !== index)
    )
  }

  const handleProductClear = (index) => {
    const updatedProductDetails = [...productDetails]

    updatedProductDetails[index] = { ...initialProductDetails }

    setProductDetails(updatedProductDetails)
  }

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/purchase_order/packSize', {
  //     params: {
  //       prodId: formData.prodId
  //     }
  //   })
  //     .then(response => {
  //       setFormData(prevFormData => ({
  //         ...prevFormData,
  //         packSize: response.data.pack_size,
  //         productDesc: response.data.prod_desc
  //       }));
  //     })
  //     .catch(error => {
  //       console.log(error.response.data.error);
  //     });
  //   if (formData.prodId === '') {
  //     setFormData(prevFormData => ({
  //       ...prevFormData,
  //       packSize: '',
  //       productDesc: ''
  //     }));
  //   }
  // }, [formData.prodId]);

  useEffect(() => {
    console.log(formData.customerId)
    api
      .get("/customerName", {
        params: {
          customerId: formData.customerId,
        },
      })
      .then((response) => {
        console.log("response_data: ", response.data)
        setFormData((prevFormData) => ({
          ...prevFormData,
          consigneeId: formData.customerId,
          customerName: response.data.customer_name,
          consigneeName: response.data.customer_name,
        }))
      })

      .catch((error) => {
        resetForm()
        console.log(error.data.error)
      })
  }, [formData.customerId])

  const options = []
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    })
  }

  let additionalDescPlaceholder = "Additional Description"
  const descPlaceholderOnFocus = () => {
    additionalDescPlaceholder = ""
  }
  const descPlaceholderOnBlur = () => {
    additionalDescPlaceholder = "Additional Description"
  }

  const addMore = () => {
    //   const lastElement = psn[psn.length - 1]
    //   console.log(lastElement)
    //   let dup = false

    //   // Check for duplicates
    //   for (let i = 0; i < psn.length - 1; i++) {
    //     if (psn[i] === lastElement) {
    //       dup = true
    //       break
    //     }
    //   }

    //   if (dup) {
    //     setProductValidation((prevProductValidation) => ({
    //       ...prevProductValidation,
    //       ["poSlNo"]: "Already Exists",
    //     }))
    //   } else {
    //     setProductValidation((prevProductValidation) => ({
    //       ...prevProductValidation,
    //       ["poSlNo"]: "",
    //     }))
    //     setProductDetails((prevProductDetails) => [
    //       ...prevProductDetails,
    //       initialProductDetails,
    //     ])
    //   }
    setProductDetails((prevProductDetails) => [
      ...prevProductDetails,
      initialProductDetails,
    ])
  }

  // const [isFocused, setIsFocused] = useState(false)

  // const handleFocus = () => {
  //   setIsFocused(true)
  // }

  // const handleBlur = () => {
  //   setIsFocused(false)
  // }

  // Handle change events
  const handleCheckboxChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.checked,
    }))
    console.log(formData)
  }

  useEffect(() => {
    formData.consigneeId != formData.customerId
      ? api
          .get("/customerName", {
            params: {
              customerId: formData.consigneeId,
            },
          })
          .then((response) => {
            console.log("response_data: ", response.data)
            setFormData((prevFormData) => ({
              ...prevFormData,
              consigneeId: formData.consigneeId,
              consigneeName: response.data.customer_name,
            }))
          })

          .catch((error) => {
            // resetForm()
            console.log(error.data.error)
          })
      : ""
    if (formData.consigneeId == "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        consigneeName: "",
      }))
    }
  }, [formData.consigneeId])

  return (
    <div className="customer-container">
      {/* <Sidebar /> */}
      <div className="complete-form-container">
        <div className="form-header-container">
          <h1>Customer Purchase Order</h1>
          <Link to="/edit_customerPurchaseOrder">Edit</Link>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-input-and-button-container">
              <div className="only-input-styles">
                <div className="autocomplete-wrapper">
                  <AutoCompleteComponent
                    data={customerData}
                    mainData={formData}
                    setData={setCustomerData}
                    setMainData={setFormData}
                    handleChange={handleChange}
                    filteredData={filteredCustomerData}
                    setFilteredData={setFilteredCustomerData}
                    name="customerId"
                    placeholder="Customer ID"
                    search_value="cust_id"
                    required={true}
                  />
                </div>
                <div className="autocomplete-wrapper">
                  <AutoCompleteComponent
                    data={purchaseOrder}
                    mainData={formData}
                    setData={setPurchaseOrder}
                    setMainData={setFormData}
                    handleChange={handleChange}
                    filteredData={filteredPurchaseData}
                    setFilteredData={setFilteredPurchaseData}
                    name="poNo"
                    placeholder="Customer PO No."
                    search_value="pono"
                    required={true}
                  />
                </div>
                <div>
                  <div className="datePickerContainer">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onDateChange}
                        value={
                          formData.poDate
                            ? dayjs(formData.poDate, "DD-MM-YYYY")
                            : ""
                        }
                        format="DD-MM-YYYY"
                        placeholder={"PO Date"}
                      />
                      {formData.poDate && (
                        <label className="poLabel">PO Date</label>
                      )}
                    </Space>
                  </div>
                </div>
                <div>
                  {/* <input type="text" required={true} name="poValidity" value={formData.poValidity} onChange={handleChange} />
                  <label alt='Enter the PO Validity' placeholder='PO Validity'></label> */}
                  <div>
                    <Space direction="vertical">
                      <div className="datePickerContainer">
                        <DatePicker
                          onChange={onValidityChange}
                          value={
                            formData.poValidity
                              ? dayjs(formData.poValidity, "DD-MM-YYYY")
                              : ""
                          }
                          format="DD-MM-YYYY"
                          placeholder={"PO Validity"}
                        />
                        {formData.poValidity && (
                          <label className="poLabel">PO Validity</label>
                        )}
                      </div>
                    </Space>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    // required={true}
                    name="quoteId"
                    value={formData.quoteId}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Quote ID"
                    placeholder="Quote ID"
                  ></label>
                </div>
                {/* <div>
                  <input
                    type="text"
                    // required={true}
                    name="consigneeId"
                    value={formData.consigneeId}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Consignee ID"
                    placeholder="Consignee ID"
                  ></label>
                </div> */}
                <div className="autocomplete-wrapper">
                  <AutoCompleteComponent
                    data={customerData}
                    mainData={formData}
                    setData={setCustomerData}
                    setMainData={setFormData}
                    handleChange={handleChange}
                    filteredData={filteredCustomerData}
                    setFilteredData={setFilteredCustomerData}
                    name="consigneeId"
                    placeholder="Consignee ID"
                    search_value="cust_id"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder=" "
                    readOnly
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
                    name="consigneeName"
                    value={formData.consigneeName}
                    onChange={handleChange}
                    placeholder=" "
                    readOnly
                  />
                  <label
                    alt="Enter the Consignee Name"
                    placeholder="Consignee Name"
                  ></label>
                </div>
                {/* <div className="gstApplicable">
                  <label>
                    <input
                      type="checkbox"
                      name="gstException"
                      checked={formData.gstException}
                      onChange={handleCheckboxChange}
                    />
                    Gst Exception
                  </label>
                </div> */}
              </div>
              {/* {productDetails &&
                productDetails.map((productDetail, index) => {
                  return (
                    <> */}
              <ProductDetails
                // key={index}
                // index={index}
                formData={productDetails}
                setFormData={setProductDetails}
                handleChange={handleProductChange}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                filteredSuggestions={filteredSuggestions}
                setFilteredSuggestions={setFilteredSuggestions}
                handleSuggestionClick={handleSuggestionClick}
                options={options}
                handleInputChange={handleInputChange}
                additionalDescPlaceholder={additionalDescPlaceholder}
                descPlaceholderOnFocus={descPlaceholderOnFocus}
                descPlaceholderOnBlur={descPlaceholderOnBlur}
                onProductDateChange={onProductDateChange}
                setTotal={setTotal}
                handleMultipleSelectChange={handleMultipleSelectChange}
                handleProductDelete={handleProductDelete}
                handleProductClear={handleProductClear}
                productValidation={productValidation}
                productLength={productDetails.length}
              />
              {/* </>
                  )
                })} */}
            </div>
            <div>Grand Total: {grandTotal()}</div>
            <div className="form-button-container">
              <button type="button" value="nextEntry" onClick={addMore}>
                Add More
              </button>
              <button type="submit">Submit</button>
              <button type="button" value="reset" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}
