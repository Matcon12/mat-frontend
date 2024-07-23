import "./UpdatePO.css"
import { Link } from "react-router-dom"
import "../CreatePO/Customer.css"
import api from "../../../api/api.jsx"
import { useState, useEffect } from "react"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import possibleValues from "../../../../data.js"
import AutoCompleteComponent from "../../../components/AutoComplete/AutoCompleteComponent.jsx"
import { format, addYears, parse, isAfter } from "date-fns"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

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
    uom: "",
    quantity: 0.0,
    staggered_delivery: "",
    unit_price: 0.0,
    total_price: 0.0,
    qty_sent: 0.0,
    qty_balance: 0.0,
    delivery_date: null,
    // omat: "",
    hsn_sac: "",
  }

  const [searchInputs, setSearchInputs] = useState(initialSearchInputs)
  const [searchData, setSearchData] = useState(intialSearchData)
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [purchaseOrder, setPurchaseOrder] = useState()
  const [filteredPurchaseData, setFilteredPurchaseData] = useState()
  const [success, setSucess] = useState()
  const [poslnos, setPoslnos] = useState()
  const [filteredPoSlNo, setFilteredPoSlNo] = useState()

  useEffect(() => {
    api.get("/getPurchaseOrder").then((response) => {
      setPurchaseOrder(response.data.distinct_pono)
    })
  }, [])

  const searchDataReset = () => {
    setSearchData(initialSearchInputs)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .get("/getData", {
        params: {
          pono: searchInputs.pono,
        },
      })
      .then((response) => {
        const data = response.data.data
        setPoslnos(response.data.po_sl_nos)
        const parsedDate = parse(data.podate, "yyyy-MM-dd", new Date())
        const formattedPoDate = format(parsedDate, "dd-MM-yyyy")
        const validityDate = addYears(data.podate, 1)
        const formattedValidityDate = format(validityDate, "dd-MM-yyyy")
        const formattedDeliveryDate = data.delivery_date
          ? format(
              parse(data.delivery_date, "yyyy-MM-dd", new Date()),
              "dd-MM-yyyy"
            )
          : ""
        console.log("uom: ", data.uom)
        setSearchData({
          pono: data.pono,
          podate: formattedPoDate,
          po_validity: formattedValidityDate,
          quote_id: data.quote_id,
          customer_id: data.customer_id,
          consignee_id: data.consignee_id,
          po_sl_no: data.po_sl_no,
          prod_code: data.prod_code,
          prod_desc: data.prod_desc,
          additional_desc: data.additional_desc,
          // omat: data.omat,
          pack_size: data.pack_size,
          staggered_delivery: data.staggered_delivery,
          quantity: parseFloat(data.quantity),
          unit_price: parseFloat(data.unit_price),
          total_price: parseFloat(data.total_price),
          qty_sent: parseFloat(data.qty_sent),
          qty_balance: parseFloat(data.qty_balance),
          delivery_date: formattedDeliveryDate,
          uom: data.uom,
          hsn_sac: data.hsn_sac,
        })
        toast.success("Successfuly fetched Data!!")
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  const resetDataForm = () => {
    setSearchData({
      pono: searchData.pono,
      podate: "",
      po_validity: "",
      quote_id: "",
      customer_id: searchData.customer_id,
      consignee_id: searchData.consignee_id,
      po_sl_no: "",
      prod_code: "",
      prod_desc: "",
      additional_desc: "",
      pack_size: "",
      uom: "",
      quantity: 0.0,
      staggered_delivery: "",
      unit_price: 0.0,
      total_price: 0.0,
      qty_sent: 0.0,
      qty_balance: 0.0,
      delivery_date: null,
      // omat: "",
      hsn_sac: "",
    })
  }

  const handleUpdate = (e) => {
    console.log("update")
    e.preventDefault()
    api
      .put("/updateForm", { searchInputs, searchData })
      .then((response) => {
        console.log(response.data)
        // setSucess("Form Updated Successfully")
        resetDataForm()
        toast.success(
          `Form Updated Successfully for PO Sl No: ${searchData.po_sl_no}`
        )
      })
      .catch((error) => {
        console.error("Error updating data: ", error)
      })
  }

  const handleChange = (e) => {
    if (e.target.name === "po_sl_no") {
      const cust_id = searchData.customer_id
      setSearchData({
        ...searchData,
        po_sl_no: e.target.value,
      })
      console.log({
        cust_id: searchData.customer_id,
        po_no: searchInputs.pono,
        po_sl_no: e.target.value,
      })
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
          const parsedDate = parse(data.podate, "yyyy-MM-dd", new Date())
          const formattedPoDate = format(parsedDate, "dd-MM-yyyy")
          console.log(formattedPoDate)

          const parsedValidityDate = data.po_validity
            ? parse(data.po_validity, "yyyy-MM-dd", new Date())
            : null
          const formattedValidityDate = parsedValidityDate
            ? format(parsedValidityDate, "dd-MM-yyyy")
            : null
          console.log(formattedValidityDate)

          const parsedDeliveryDate = data.delivery_date
            ? parse(data.delivery_date, "yyyy-MM-dd", new Date())
            : null

          const formattedDeliveryDate = parsedDeliveryDate
            ? format(parsedDeliveryDate, "dd-MM-yyyy")
            : null
          console.log(
            formattedPoDate,
            formattedValidityDate,
            formattedDeliveryDate
          )
          setSearchData({
            pono: data.pono,
            podate: formattedPoDate,
            po_validity: formattedValidityDate,
            quote_id: data.quote_id,
            customer_id: data.customer_id,
            consignee_id: data.consignee_id,
            po_sl_no: data.po_sl_no,
            prod_code: data.prod_code,
            prod_desc: data.prod_desc,
            additional_desc: data.additional_desc,
            pack_size: data.pack_size,
            staggered_delivery: data.staggered_delivery,
            quantity: parseFloat(data.quantity),
            unit_price: parseFloat(data.unit_price),
            total_price: parseFloat(data.total_price),
            qty_sent: parseFloat(data.qty_sent),
            qty_balance: parseFloat(data.qty_balance),
            delivery_date: formattedDeliveryDate,
            hsn_sac: data.hsn_sac,
            // omat: data.omat,
            uom: data.uom,
          })
          console.log("data: ", data)
          console.log("searchData: ", searchData)
          toast.info("Successfully fetched data for the PO Sl No.")
        })
        .catch((error) => {
          setSearchData((prevSearchData) => ({
            ...prevSearchData,
            customer_id: cust_id,
            po_sl_no: e.target.value,
            pono: "",
            podate: "",
            po_validity: "",
            quote_id: "",
            consignee_id: "",
            prod_code: "",
            prod_desc: "",
            additional_desc: "",
            pack_size: "",
            staggered_delivery: "",
            quantity: 0,
            unit_price: 0,
            total_price: 0,
            qty_sent: 0,
            qty_balance: 0,
            delivery_date: "",
            hsn_sac: "",
            // omat: "",
          }))
          console.log(error.response.data.error)
          toast.error("Error fetching the data")
        })
    }
    // if (e.target.name === "customer_id") {
    //   console.log("po_sl_no: ", e.target.value, e.target.name)
    //   setSearchData({
    //     ...searchData,
    //     customer_id: e.target.value,
    //   })
    //   console.log(
    //     "customer_id: ",
    //     searchData.customer_id,
    //     searchInputs.pono,
    //     searchData.po_sl_no
    //   )
    //   api
    //     .get("/getDataPoCust", {
    //       params: {
    //         customer_id: e.target.value,
    //         pono: searchInputs.pono,
    //         po_sl_no: searchData.po_sl_no,
    //       },
    //     })
    //     .then((response) => {
    //       let data = response.data[0]
    //       console.log(data)
    //       const parsedDate = parse(data.podate, "yyyy-MM-dd", new Date())
    //       const validityDate = addYears(parsedDate, 1)
    //       const formattedValidityDate = format(validityDate, "yyyy-MM-dd")
    //       setSearchData({
    //         pono: data.pono,
    //         podate: data.podate,
    //         po_validity: formattedValidityDate,
    //         quote_id: data.quote_id,
    //         customer_id: data.customer_id,
    //         consignee_id: data.consignee_id,
    //         po_sl_no: data.po_sl_no,
    //         prod_code: data.prod_code,
    //         prod_desc: data.prod_desc,
    //         additional_desc: data.additional_desc,
    //         pack_size: data.pack_size,
    //         staggered_delivery: data.staggered_delivery,
    //         // quantity: data.quantity,
    //         // unit_price: data.unit_price,
    //         // total_price: data.tota_price,
    //         // qty_sent: data.qty_sent,
    //         // qty_balance: data.qty_balance,
    //         quantity: parseFloat(data.quantity),
    //         unit_price: parseFloat(data.unit_price),
    //         total_price: parseFloat(data.total_price),
    //         qty_sent: parseFloat(data.qty_sent),
    //         qty_balance: parseFloat(data.qty_balance),
    //         delivery_date: data.delivery_date,
    //         hsn_sac: data.hsn_sac,
    //         // gst_exemption: data.gst_exemption,
    //       })
    //       console.log("data: ", data)
    //       console.log("searchData: ", searchData)
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.error)
    //     })
    // } else {
    //   console.log("entered")
    //   setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value })
    // }
  }

  const handleChangeData = (e) => {
    const { name, value } = e.target
    setSearchData({
      ...searchData,
      [name]: ["quantity", "unit_price", "qty_sent", "qty_balance"].includes(
        name
      )
        ? parseFloat(value)
        : value,
    })
  }

  const onDateChange = (date, dateString) => {
    console.log("dateString: ", dateString)
    setSearchData((prevFormData) => ({
      ...prevFormData,
      podate: dateString,
    }))
  }

  const onDeliveryDateChange = (date, dateString) => {
    const poDateString = searchData.podate

    // Parse the dates from "dd-MM-yyyy" format
    const poDate = parse(poDateString, "dd-MM-yyyy", new Date())
    const deliveryDate = parse(dateString, "dd-MM-yyyy", new Date())

    console.log("PO Date:", format(poDate, "dd-MM-yyyy"))
    console.log("Delivery Date:", format(deliveryDate, "dd-MM-yyyy"))

    setSearchData((prevFormData) => ({
      ...prevFormData,
      delivery_date:
        isAfter(deliveryDate, poDate) ||
        format(deliveryDate, "dd-MM-yyyy") === format(poDate, "dd-MM-yyyy")
          ? dateString
          : "",
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

  // const handleCheckboxChange = (event) => {
  //   setSearchData((prevFormData) => ({
  //     ...prevFormData,
  //     [event.target.name]: event.target.checked,
  //   }))
  //   console.log(searchData)
  // }

  useEffect(() => {
    const balance = searchData.quantity - searchData.qty_sent
    const total = parseFloat(
      searchData.quantity * searchData.unit_price
    ).toFixed(2)

    setSearchData((prevData) => ({
      ...prevData,
      qty_balance: balance,
      total_price: total,
    }))
  }, [searchData.qty_sent, searchData.quantity, searchData.unit_price])

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
                  readOnly
                />
                <label
                  alt="Enter the customer Id"
                  placeholder="Customer ID"
                ></label>
              </div>
              {/* <div className="autocomplete-wrapper">
                <AutoCompleteComponent
                  data={poslnos}
                  mainData={searchData}
                  setData={setPoslnos}
                  setMainData={setSearchData}
                  filteredData={filteredPoSlNo}
                  setFilteredData={setFilteredPoSlNo}
                  name="po_sl_no"
                  placeholder="PO Sl No."
                  search_value="po_sl_no"
                  onchange={handleChange}
                />
              </div> */}
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
              {/* <div className="gstApplicable">
                <label>
                  <input
                    type="checkbox"
                    name="gst_exemption"
                    checked={searchData.gst_exemption}
                    onChange={handleCheckboxChange}
                  />
                  GST Exemption
                </label>
              </div> */}
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
                    onChange={handleChangeData}
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
                    onChange={handleChangeData}
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
                    readOnly={true}
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
                    onChange={handleChangeData}
                  />
                  <label alt="Enter the prod Code" placeholder="Prod Code"></label>
                </div> */}
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="prod_desc"
                    value={searchData.prod_desc}
                    onChange={handleChangeData}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Prod Description"
                    placeholder="Product Description"
                  ></label>
                </div>
                <div className="specifications-span-2">
                  <input
                    type="text"
                    /*required={true}*/
                    name="additional_desc"
                    value={searchData.additional_desc}
                    onChange={handleChangeData}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Additional Desc"
                    placeholder="Specifications"
                  ></label>
                </div>
                {/* <div>
                  <input
                    type="text"
                    //required={true}
                    name="omat"
                    value={searchData.omat}
                    onChange={handleChangeData}
                    placeholder=" "
                  />
                  <label alt="Enter the OMAT" placeholder="OMAT"></label>
                </div> */}
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="pack_size"
                    value={searchData.pack_size}
                    onChange={handleChangeData}
                    placeholder=" "
                    readOnly
                  />
                  <label
                    alt="Enter the Pack Size"
                    placeholder="Pack Size/UOM"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    /*required={true}*/
                    name="uom"
                    value={searchData.uom}
                    onChange={handleChangeData}
                    placeholder=" "
                    readOnly
                  />
                  <label alt="Enter the UOM" placeholder="UOM"></label>
                </div>
                {/* <div className="input-container">
                  <select
                    name="uom"
                    value={searchData.uom}
                    onChange={handleChangeData}
                    required
                    readOnly
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
                </div> */}
                <div>
                  <input
                    type="number"
                    /*required={true}*/
                    name="quantity"
                    value={searchData.quantity}
                    onChange={handleChangeData}
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
                    onChange={handleChangeData}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Staggered Delivery"
                    placeholder="Staggered Delivery"
                  ></label>
                </div>
                <div>
                  <input
                    type="number"
                    /*required={true}*/
                    name="unit_price"
                    value={searchData.unit_price}
                    onChange={handleChangeData}
                    placeholder=" "
                  />
                  <label
                    alt="Enter the Unit Price"
                    placeholder="Unit Price"
                  ></label>
                </div>
                <div>
                  <input
                    type="number"
                    /*required={true}*/
                    name="total_price"
                    value={searchData.total_price}
                    placeholder=" "
                    readOnly
                  />
                  <label
                    alt="Enter the Total Price"
                    placeholder="Total Price"
                  ></label>
                </div>
                <div>
                  <input
                    type="number"
                    /*required={true}*/
                    name="qty_sent"
                    value={searchData.qty_sent}
                    onChange={handleChangeData}
                    placeholder=" "
                    // readOnly
                  />
                  <label
                    alt="Enter the quantity sent"
                    placeholder="Quantity Sent"
                  ></label>
                </div>
                <div>
                  <input
                    type="number"
                    /*required={true}*/
                    name="qty_bal"
                    value={searchData.qty_balance}
                    onChange={handleChangeData}
                    placeholder=" "
                    readOnly
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
                    onChange={handleChangeData}
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

      <ToastContainer />
    </div>
  )
}
