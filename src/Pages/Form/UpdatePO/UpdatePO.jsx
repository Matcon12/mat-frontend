import "./UpdatePO.css"
import { Link } from "react-router-dom"
import "../CreatePO/Customer.css"
import api from "../../../api/api.jsx"
import { useState, useEffect } from "react"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import possibleValues from "../../../../data.js"
import AutoCompleteComponent from "../../../components/AutoComplete/AutoCompleteComponent.jsx"
import { format, addYears, parse } from "date-fns"

export default function UpdatePO() {
  const initialSearchInputs = {
    customer_id: "",
  }
  const intialSearchData = {
    pono: "",
    podate: "",
    po_validity: "",
    quote_id: "",
    customer_id: "",
    consignee_id: "",
    po_sl_no: "",
    prod_code: "",
    prod_desc: "",
    additional_desc: "",
    pack_size: "",
    quantity: "",
    staggered_delivery: "",
    unit_price: "",
    qty_sent: "",
    qty_balance: "",
    delivery_date: "",
    omat: "",
    hsn_sac: "",
  }

  const [searchInputs, setSearchInputs] = useState(initialSearchInputs)
  const [searchData, setSearchData] = useState(intialSearchData)
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [purchaseOrder, setPurchaseOrder] = useState()
  const [filteredPurchaseData, setFilteredPurchaseData] = useState()
  const [success, setSucess] = useState()

  useEffect(() => {
    // api.get("/getCustomerData").then((response) => {
    //   setCustomerData(response.data.customerData)
    // })
    api.get("/getPurchaseOrder").then((response) => {
      setPurchaseOrder(response.data.distinct_pono)
      // console.log("response: ", response.data.purchaseOrder)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .get("/getData", {
        params: {
          pono: searchInputs.pono,
        },
      })
      .then((response) => {
        let data = response.data.data
        console.log(data)
        const parsedDate = parse(data.podate, "dd-MM-yyyy", new Date())
        const validityDate = addYears(parsedDate, 1)
        const formattedValidityDate = format(validityDate, "dd-MM-yyyy")
        setSearchData({
          pono: data.pono,
          podate: data.podate,
          po_validity: formattedValidityDate,
          quote_id: data.quote_id,
          customer_id: data.customer_id,
          consignee_id: data.consignee_id,
          po_sl_no: data.po_sl_no,
          prod_code: data.prod_code,
          prod_desc: data.prod_desc,
          additional_desc: data.additional_desc,
          omat: data.omat,
          pack_size: data.pack_size,
          quantity: data.quantity,
          staggered_delivery: data.staggered_delivery,
          unit_price: data.unit_price,
          qty_sent: data.qty_sent,
          qty_balance: data.qty_balance,
          delivery_date: data.delivery_date,
        })
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }
  const handleUpdate = (e) => {
    console.log("update")
    e.preventDefault()
    api
      .put("/updateForm", { searchInputs, searchData })
      .then((response) => {
        console.log(response.data)
        setSucess("Form Updated Successfully")
      })
      .catch((error) => {
        console.error("Error updating data: ", error)
      })
  }

  const handleChange = (e) => {
    if (e.target.name === "po_sl_no") {
      console.log("po_sl_no: ", e.target.value, e.target.name)
      setSearchData({
        ...searchData,
        po_sl_no: e.target.value,
      })
      console.log(
        "customer_id: ",
        searchData.customer_id,
        searchInputs.pono,
        searchData.po_sl_no
      )
      api
        .get("/getDataPoCust", {
          params: {
            cust_id: searchData.customer_id,
            po_no: searchInputs.pono,
            po_sl_no: e.target.value,
          },
        })
        .then((response) => {
          let data = response.data[0]
          console.log(data)
          const parsedDate = parse(data.podate, "dd-MM-yyyy", new Date())
          const validityDate = addYears(parsedDate, 1)
          const formattedValidityDate = format(validityDate, "dd-MM-yyyy")
          setSearchData({
            pono: data.pono,
            podate: data.podate,
            po_validity: formattedValidityDate,
            quote_id: data.quote_id,
            customer_id: data.customer_id,
            consignee_id: data.consignee_id,
            po_sl_no: data.po_sl_no,
            prod_code: data.prod_code,
            prod_desc: data.prod_desc,
            additional_desc: data.additional_desc,
            pack_size: data.pack_size,
            quantity: data.quantity,
            staggered_delivery: data.staggered_delivery,
            unit_price: data.unit_price,
            qty_sent: data.qty_sent,
            qty_balance: data.qty_balance,
            delivery_date: data.delivery_date,
          })
          console.log("data: ", data)
          console.log("searchData: ", searchData)
        })
        .catch((error) => {
          console.log(error.response.data.error)
        })
    }
    if (e.target.name === "customer_id") {
      console.log("po_sl_no: ", e.target.value, e.target.name)
      setSearchData({
        ...searchData,
        customer_id: e.target.value,
      })
      console.log(
        "customer_id: ",
        searchData.customer_id,
        searchInputs.pono,
        searchData.po_sl_no
      )
      api
        .get("/getDataPoCust", {
          params: {
            customer_id: e.target.value,
            pono: searchInputs.pono,
            po_sl_no: searchData.po_sl_no,
          },
        })
        .then((response) => {
          let data = response.data[0]
          console.log(data)
          const parsedDate = parse(data.podate, "dd-MM-yyyy", new Date())
          const validityDate = addYears(parsedDate, 1)
          const formattedValidityDate = format(validityDate, "dd-MM-yyyy")
          setSearchData({
            pono: data.pono,
            podate: data.podate,
            po_validity: formattedValidityDate,
            quote_id: data.quote_id,
            customer_id: data.customer_id,
            consignee_id: data.consignee_id,
            po_sl_no: data.po_sl_no,
            prod_code: data.prod_code,
            prod_desc: data.prod_desc,
            additional_desc: data.additional_desc,
            pack_size: data.pack_size,
            quantity: data.quantity,
            staggered_delivery: data.staggered_delivery,
            unit_price: data.unit_price,
            qty_sent: data.qty_sent,
            qty_balance: data.qty_balance,
            delivery_date: data.delivery_date,
          })
          console.log("data: ", data)
          console.log("searchData: ", searchData)
        })
        .catch((error) => {
          console.log(error.response.data.error)
        })
    } else {
      console.log("entered")
      setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value })
    }
  }

  const handleChangeDate = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value })
  }

  const onDateChange = (date, dateString) => {
    setSearchData((prevFormData) => ({
      ...prevFormData,
      podate: dateString,
    }))
  }

  const onDeliveryDateChange = (date, dateString) => {
    setSearchData((prevFormData) => ({
      ...prevFormData,
      delivery_date: dateString,
    }))
  }

  const onValidityDateChange = (date, dateString) => {
    setSearchData((prevFormData) => ({
      ...prevFormData,
      po_validity: dateString,
    }))
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setSearchData((prevSearchInputs) => ({
      ...prevSearchInputs,
      prod_code: value,
    }))
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

  return (
    <div className="customer-container">
      <div className="complete-form-container">
        <div className="form-header-container">
          <h1>Update Customer Purchase Order</h1>
          <Link to="/purchase_order">New Entry</Link>
        </div>
        <div className="form-container">
          {/* fetching the data from the database to edit */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="only-input-styles">
              <div className="autocomplete-wrapper">
                <AutoCompleteComponent
                  data={purchaseOrder}
                  mainData={searchInputs}
                  setData={setPurchaseOrder}
                  setMainData={setSearchInputs}
                  handleChange={handleChange}
                  filteredData={filteredPurchaseData}
                  setFilteredData={setFilteredPurchaseData}
                  name="pono"
                  placeholder="PO No."
                  search_value="pono"
                />
              </div>
              {/* <div>
                <input
                  type="text"
                  required={true}
                  name="pono"
                  onChange={handleChange}
                />
                <label alt="Enter the PO No" placeholder="PO No."></label>
              </div> */}
              <div className="form-button-container">
                <button type="submit">Get Data</button>
              </div>

              <div>
                <input
                  type="text"
                  // required={true}
                  value={searchData.customer_id}
                  name="customer_id"
                  onChange={handleChange}
                  placeholder=" "
                />
                <label
                  alt="Enter the customer Id"
                  placeholder="CustomerId"
                ></label>
              </div>
              <div>
                <input
                  type="text"
                  // required={true}
                  value={searchData.po_sl_no}
                  name="po_sl_no"
                  onChange={handleChange}
                  placeholder=" "
                />
                <label alt="Enter the PO_Sl_No" placeholder="PO Sl No."></label>
              </div>
            </div>
          </form>
        </div>
        <div className="form-container">
          <form onSubmit={handleUpdate}>
            {/* {searchData.pono && ( */}
            <>
              <div className="only-input-styles">
                <div>
                  <div className="datePickerContainer">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onDateChange}
                        name="podate"
                        value={
                          searchData.podate
                            ? dayjs(searchData.podate, "DD-MM-YYYY")
                            : ""
                        }
                        format="DD-MM-YYYY"
                        placeholder={"PO Date"}
                      />
                      {searchData.podate && (
                        <label className="poLabel">PO Date</label>
                      )}
                    </Space>
                  </div>
                </div>
                <div>
                  <div className="datePickerContainer">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onValidityDateChange}
                        name="po_validity"
                        value={
                          searchData.po_validity
                            ? dayjs(searchData.po_validity, "DD-MM-YYYY")
                            : ""
                        }
                        format="DD-MM-YYYY"
                        placeholder={"PO Validity"}
                      />
                      {searchData.po_validity && (
                        <label className="poLabel">PO Validity</label>
                      )}
                    </Space>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="quote_id"
                    value={searchData.quote_id}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the quote Id"
                    placeholder="Quote ID"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="consignee_id"
                    value={searchData.consignee_id}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the consignee Id"
                    placeholder="Consignee ID"
                  ></label>
                </div>
                <div className="autocomplete-wrapper">
                  <input
                    type="text"
                    /*required={true}*/
                    name="prodId"
                    value={searchData.prod_code}
                    onChange={(e) => handleInputChange(e)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-autocomplete="list"
                    aria-controls="autocomplete-list"
                    placeholder=" "
                  />
                  {/* <input type="text" required={true} name="prodId" value={formData.prodId} onChange={(e) => handleInputChange(index, e)} onFocus={(e) => handleFocus(index, e)} onBlur={(e) => handleBlur(index, e)} aria-autocomplete="list" aria-controls="autocomplete-list" /> */}
                  <label
                    alt="Enter the Product Code"
                    placeholder="Product Code"
                  ></label>
                  {isFocused && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((suggestion, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSuggestionClick(suggestion, index)
                          }
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* <div>
                  <input
                    type="text"
                    required={true}
                    name="prod_id"
                    value={searchData.prod_id}
                    onChange={handleChangeDate}
                  />
                  <label alt="Enter the prod Code" placeholder="Prod Code"></label>
                </div> */}
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="prod_desc"
                    value={searchData.prod_desc}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Prod Description"
                    placeholder="Prod Desc"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="additional_desc"
                    value={searchData.additional_desc}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Additional Desc"
                    placeholder="Additional Desc"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="omat"
                    value={searchData.omat}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label alt="Enter the OMAT" placeholder="OMAT"></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="pack_size"
                    value={searchData.pack_size}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Pack Size"
                    placeholder="Pack Size"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="quantity"
                    value={searchData.quantity}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Quantity"
                    placeholder="Quantity"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="staggered_delivery"
                    value={searchData.staggered_delivery}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Staggered Delivery"
                    placeholder="Staggered Delivery"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="unit_price"
                    value={searchData.unit_price}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Unit Price"
                    placeholder="Unit Price"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="qty_sent"
                    value={searchData.qty_sent}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the quantity sent"
                    placeholder="Quantity Sent"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="qty_bal"
                    value={searchData.qty_balance}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Quantity Balance"
                    placeholder="Quantity Balance"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="hsn_sac"
                    value={searchData.hsn_sac}
                    onChange={handleChangeDate}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the HSN_SAC Code"
                    placeholder="HSN_SAC Code"
                  ></label>
                </div>
                <div>
                  <div className="datePickerContainer">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onDeliveryDateChange}
                        value={
                          searchData.delivery_date
                            ? dayjs(searchData.delivery_date, "DD-MM-YYYY")
                            : ""
                        }
                        format="DD-MM-YYYY"
                        placeholder={"Delivery Date"}
                      />
                      {searchData.podate && (
                        <label className="poLabel">Delivery Date</label>
                      )}
                    </Space>
                  </div>
                </div>
              </div>
              <div>
                <p>{success}</p>
              </div>
              <div className="form-button-container">
                <button type="submit">Update</button>
              </div>
            </>
            {/* )} */}
          </form>
        </div>
      </div>
    </div>
  )
}
