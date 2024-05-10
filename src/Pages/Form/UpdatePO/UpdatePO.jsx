import './UpdatePO.css'
import { Link } from 'react-router-dom'
import '../CreatePO/Customer.css'
import axios from 'axios'
import { useState } from 'react'
import Input from '../../../reuse/Input/Input'

export default function UpdatePO() {

  const initialSearchInputs = {
    cust_id: '',
    po_no: '',
    po_sl_no: ''
  }
  const intialSearchData = {
    po_no: "",
    po_date: "",
    po_validity: "",
    quote_id: "",
    cust_id: "",
    consignee_id: "",
    po_sl_no: "",
    prod_id: "",
    prod_desc: "",
    additional_desc: "",
    pack_size: "",
    quantity: "",
    staggered_deliver: "",
    unit_price: "",
    qty_sent: "",
    qty_bal: ""
  }

  const [searchInputs, setSearchInputs] = useState(initialSearchInputs)
  const [searchData, setSearchData] = useState(intialSearchData)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get('http://localhost:8000/purchase_order/getData', {
      params: {
        cust_id: searchInputs.cust_id,
        po_no: searchInputs.po_no,
        po_sl_no: searchInputs.po_sl_no
      }
    })
      .then(response => {
        let data = response.data[0]
        console.log(data)
        setSearchData(prevSearchData => ({
          ...prevSearchData,
          po_no: data.po_no,
          po_date: data.po_date,
          po_validity: data.po_validity,
          quote_id: data.quote_id,
          cust_id: data.cust_id,
          consignee_id: data.consignee_id,
          po_sl_no: data.po_sl_no,
          prod_id: data.prod_id,
          prod_desc: data.productDesc,
          msrr: data.msrr,
          pack_size: data.pack_size,
          quantity: data.quantity,
          staggered_deliver: data.staggered_deliver,
          unit_price: data.unit_price,
          qty_sent: data.qty_sent,
          qty_bal: data.qty_bal
        }))
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  }
  const handleUpdate = (e) => {
    console.log('update')
    e.preventDefault();
    axios.put("http://127.0.0.1:8000/purchase_order/updateForm", searchData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error updating data: ", error)
      })
  }

  const handleChange = (e) => {
    setSearchInputs({ ...searchInputs, [e.target.name]: e.target.value })
  }

  return (
    <div className="complete-form-container">
      <div className="form-header-container">
        <h1>Update Customer Purchase Order</h1>
        <Link to="/purchase_order">New Entry</Link>
      </div>
      <div className="form-container">
        {/* fetching the data from the database to edit */}
        <form onSubmit={handleSubmit} autoComplete='on'>
          <div className="only-input-styles">
            <div>
              <input type="text" required={true} name="cust_id" onChange={handleChange} />
              <label alt="Enter the customer Id" placeholder="CustomerId"></label>
            </div>
            <div>
              <input type="text" required={true} name="po_no" onChange={handleChange} />
              <label alt="Enter the PO No" placeholder="PO No."></label>
            </div>
            <div>
              <input type="text" required={true} name="po_sl_no" onChange={handleChange} />
              <label alt="Enter the PO_Sl_No" placeholder="PO Sl No."></label>
            </div>
            <div className="form-button-container">
              <button type="submit">Get Data</button>
            </div>
          </div>
        </form>
      </div>
      <div className='form-container'>
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
              <Input name="po_date" value={searchData.po_date} change={setSearchData} />
              <Input name="po_validity" value={searchData.po_validity} change={setSearchData} />
              <Input name="quote_id" value={searchData.quote_id} change={setSearchData} />
              <Input name="consignee_id" value={searchData.consignee_id} change={setSearchData} />
              <Input name="prod_id" value={searchData.prod_id} change={setSearchData} />
              <Input name="prod_desc" value={searchData.prod_desc} change={setSearchData} />
              <Input name="additional_desc" value={searchData.additional_desc} change={setSearchData} />
              <Input name="pack_size" value={searchData.pack_size} change={setSearchData} />
              <Input name="quantity" value={searchData.quantity} change={setSearchData} />
              <Input name="staggered_deliery" value={searchData.staggered_deliver} change={setSearchData} />
              <Input name="unit_price" value={searchData.unit_price} change={setSearchData} />
              <Input name="qty_sent" value={searchData.qty_sent} change={setSearchData} />
              <Input name="qty_bal" value={searchData.qty_bal} change={setSearchData} />
            </div>
            <div className="form-button-container">
              <button type="submit">Update</button>
            </div>
          </>
          {/* )} */}
        </form>
      </div>
    </div>
  )
}