import "./UpdatePO.css"
import { Link } from "react-router-dom"
import "../CreatePO/Customer.css"
import axios from "axios"
import { useState } from "react"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"

export default function UpdatePO() {
  const initialSearchInputs = {
    cust_id: "",
    po_no: "",
    po_sl_no: "",
  }
  const intialSearchData = {
    po_no: "",
    podate: "",
    po_validity: "",
    quote_id: "",
    cust_id: "",
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
  }

  const [searchInputs, setSearchInputs] = useState(initialSearchInputs)
  const [searchData, setSearchData] = useState(intialSearchData)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .get("http://localhost:8000/purchase_order/getData", {
        params: {
          cust_id: searchInputs.cust_id,
          po_no: searchInputs.po_no,
          po_sl_no: searchInputs.po_sl_no,
        },
      })
      .then((response) => {
        let data = response.data[0]
        console.log(data)
        setSearchData((prevSearchData) => ({
          ...prevSearchData,
          po_no: data.po_no,
          podate: data.podate,
          po_validity: data.po_validity,
          quote_id: data.quote_id,
          cust_id: data.cust_id,
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
          qty_balance: data.qty_bal,
          delivery_date: data.delivery_date,
        }))
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }
  const handleUpdate = (e) => {
    console.log("update")
    e.preventDefault()
    axios
      .put(
        "http://127.0.0.1:8000/purchase_order/updateForm",
        { searchInputs, searchData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error updating data: ", error)
      })
  }

  const handleChange = (e) => {
    setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value })
  }

  const handleChangeDate = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value })
  }

  const onDateChange = (date, dateString) => {
    setSearchData((prevFormData) => ({
      ...prevFormData,
      po_date: dateString,
    }))
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
          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="only-input-styles">
              <div>
                <input
                  type="text"
                  required={true}
                  name="cust_id"
                  onChange={handleChange}
                />
                <label
                  alt="Enter the customer Id"
                  placeholder="CustomerId"
                ></label>
              </div>
              <div>
                <input
                  type="text"
                  required={true}
                  name="po_no"
                  onChange={handleChange}
                />
                <label alt="Enter the PO No" placeholder="PO No."></label>
              </div>
              <div>
                <input
                  type="text"
                  required={true}
                  name="po_sl_no"
                  onChange={handleChange}
                />
                <label alt="Enter the PO_Sl_No" placeholder="PO Sl No."></label>
              </div>
              <div className="form-button-container">
                <button type="submit">Get Data</button>
              </div>
            </div>
          </form>
        </div>
        <div className="form-container">
          <form onSubmit={handleUpdate}>
            {/* {searchData.po_no && ( */}
            <>
              {/* po_no: data.po_no,
          po_date: data.po_date,
          po_validity: data.po_validity,
          quote_id: data.quote_id,
          cust_id: data.cust_id,
          consignee_id: data.consignee_id,
          po_sl_no: data.po_sl_no,
          prod_id: data.prod_id,
          prod_desc: data.prod_desc,
          msrr: data.msrr,
          pack_size: data.pack_size,
          quantity: data.quantity,
          staggered_deliver: data.staggered_deliver,
          unit_price: data.unit_price,
          qty_sent: data.qty_sent,
          qty_bal: data.qty_bal */}
              <div className="only-input-styles">
                <div>
                  {/* <input
                    type="text"
                    required={true}
                    name="po_date"
                    value={searchData.po_date}
                    onChange={handleChange}
                  />
                  <label alt="Enter the PO Date" placeholder="PO Date"></label> */}
                  <div className="datePickerContainer">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onDateChange}
                        value={
                          searchData.po_date ? dayjs(searchData.po_date) : ""
                        }
                        placeholder={"PO Date"}
                      />
                      {searchData.po_date && (
                        <label className="poLabel">PO Date</label>
                      )}
                    </Space>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="po_validity"
                    value={searchData.po_validity}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the PO Validity"
                    placeholder="PO Validity"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="quote_id"
                    value={searchData.quote_id}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the quote Id"
                    placeholder="Quote ID"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="consignee_id"
                    value={searchData.consignee_id}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the consignee Id"
                    placeholder="Consignee ID"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="prod_id"
                    value={searchData.prod_id}
                    onChange={handleChangeDate}
                  />
                  <label alt="Enter the prod Id" placeholder="Prod ID"></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="prod_desc"
                    value={searchData.prod_desc}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Prod Description"
                    placeholder="Prod Desc"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="additional_desc"
                    value={searchData.additional_desc}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Additional Desc"
                    placeholder="Additional Desc"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="pack_size"
                    value={searchData.pack_size}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Pack Size"
                    placeholder="Pack Size"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="quantity"
                    value={searchData.quantity}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Quantity"
                    placeholder="Quantity"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="staggered_delivery"
                    value={searchData.staggered_delivery}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Staggered Delivery"
                    placeholder="Staggered Delivery"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="unit_price"
                    value={searchData.unit_price}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Unit Price"
                    placeholder="Unit Price"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="qty_sent"
                    value={searchData.qty_sent}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the quantity sent"
                    placeholder="Quantity Sent"
                  ></label>
                </div>
                <div>
                  <input
                    type="text"
                    required={true}
                    name="qty_bal"
                    value={searchData.qty_bal}
                    onChange={handleChangeDate}
                  />
                  <label
                    alt="Enter the Quantity Balance"
                    placeholder="Quantity Balance"
                  ></label>
                </div>
                <div>
                  <div className="datePickerContainer">
                    <Space direction="vertical">
                      <DatePicker
                        onChange={onDateChange}
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
