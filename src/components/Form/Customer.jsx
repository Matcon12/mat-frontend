import { useEffect, useState } from "react";
import './customer.css';
import possibleValues from '../../../data.js';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, Space } from 'antd';

export default function Customer() {

  const initialFormData = {
    customerId: "",
    customerName: "",
    poNo: "",
    poDate: "",
    poValidity: "",
    quoteId: "",
    consigneeId: "",
    consigneeName: "",
    poSlNo: "",
    prodId: "",
    packSize: "",
    productDesc: "",
    quantity: "",
    unitPrice: "",
    totalPrice: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [existingFormData, setExistingFormData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());

  const handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === 'customerId') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        'consigneeId': value
      }));
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }


  const handleSubmit = (event) => {
    event.preventDefault();

  }

  const resetForm = () => {
    setFormData(initialFormData);
    setExistingFormData([])
  }

  const getIndexFromProps = (pos) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["poSlNo"]: existingFormData[pos].poSlNo,
      ["prodId"]: existingFormData[pos].prodId,
      ["packSize"]: existingFormData[pos].packSize,
      ["productDesc"]: existingFormData[pos].productDesc,
      ["quantity"]: existingFormData[pos].quantity,
      ["unitPrice"]: existingFormData[pos].unitPrice,
      ["totalPrice"]: existingFormData[pos].totalPrice
    }))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value
    }))
    if (value.length > 0) {
      const filteredSuggestions = possibleValues.filter(suggestion =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : ['No matches found']);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData, ["prodId"]: value
    }))
    setSuggestions([]);
  };

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const resetFormPartially = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      poSlNo: '',
      prodId: '',
      packSize: '',
      productDesc: '',
      quantity: '',
      unitPrice: '',
      totalPrice: ''
    }));
  }

  const addMore = () => {
    console.log(formData);
    let data = {
      poSlNo: formData.poSlNo,
      prodId: formData.prodId,
      packSize: formData.packSize,
      productDesc: formData.productDesc,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      totalPrice: formData.totalPrice
    }
    setExistingFormData((prevFormData) => ([...prevFormData, data]));
    resetFormPartially();
  }

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    if (formData.quantity != '' && formData.unitPrice != '') {
      const quantity = parseFloat(formData.quantity);
      const unitPrice = parseFloat(formData.unitPrice);
      const totalPrice = quantity * unitPrice;
      setFormData(prevFormData => ({
        ...prevFormData,
        totalPrice: isNaN(totalPrice) ? 0 : totalPrice
      }));
    }
  }, [formData.quantity, formData.unitPrice]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/purchase_order/packSize', {
      params: {
        prodId: formData.prodId
      }
    })
      .then(response => {
        setFormData(prevFormData => ({
          ...prevFormData,
          packSize: response.data.pack_size,
          productDesc: response.data.prod_desc
        }));
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
    if (formData.prodId === '') {
      setFormData(prevFormData => ({
        ...prevFormData,
        packSize: '',
        productDesc: ''
      }));
    }
  }, [formData.prodId]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/purchase_order/customerName', {
      params: {
        customerId: formData.customerId
      }
    })
      .then(response => {
        setFormData(prevFormData => ({
          ...prevFormData,
          customerName: response.data.customer_name,
          consigneeName: response.data.customer_name
        }));
      })

      .catch(error => {
        console.log(error.response.data.error);
      });
  }, [formData.customerId]);

  return (
    <div className="customer-container">
      <Sidebar existingFormData={existingFormData} position={getIndexFromProps} />
      <div className="complete-form-container">
        <div className="form-header-container">

          <h1>Customer Purchase Order</h1>
          <p></p>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-input-and-button-container">
              <div className="only-input-styles">
                <div>
                  <input type="text" required="true" name="customerId" value={formData.customerId} onChange={handleChange} />
                  <label alt='Enter the Customer ID' placeholder='Customer ID'></label>
                </div>
                <div>
                  <input type="text" required="true" name="poNo" value={formData.poNo} onChange={handleChange} />
                  <label alt='Enter the PO No' placeholder='PO No'></label>
                </div>
                <div>
                  <Space direction="vertical">
                    <DatePicker onChange={onDateChange} placeholder={'PO Date'} />
                  </Space>
                  {/* <input type="text" required="true" name="poDate" value={formData.poDate} onChange={handleChange}/> */}
                  {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                  <label alt='Enter the PO Date' placeholder='PO Date'></label>
                </div>
                <div>
                  <input type="text" required="true" name="poValidity" value={formData.poValidity} onChange={handleChange} />
                  <label alt='Enter the PO Validity' placeholder='PO Validity'></label>
                </div>
                <div>
                  <input type="text" required="true" name="quoteId" value={formData.quoteId} onChange={handleChange} />
                  <label alt='Enter the Quote ID' placeholder='Quote ID'></label>
                </div>
                <div>
                  <input type="text" required="true" name="consigneeId" value={formData.consigneeId} onChange={handleChange} />
                  <label alt='Enter the Consignee ID' placeholder='Consignee ID'></label>
                </div>
                <div>
                  <input type="text" required="true" name="poSlNo" value={formData.poSlNo} onChange={handleChange} />
                  <label alt='Enter the PO SL No' placeholder='PO SL No'></label>
                </div>
                <div className="autocomplete-wrapper">
                  <input type="text" required="true" name="prodId" value={formData.prodId} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} aria-autocomplete="list" aria-controls="autocomplete-list" />
                  <label alt='Enter the Product Code' placeholder='Product Code'></label>
                  {isFocused && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <input type="text" required="true" name="packSize" value={formData.packSize} onChange={handleChange} />
                  <label alt='Enter the Pack Size' placeholder='Pack Size'></label>
                </div>
                <div>
                  <input type="text" required="true" name="quantity" value={formData.quantity} onChange={handleChange} />
                  <label alt='Enter the Quantity' placeholder='Quantity'></label>
                </div>
                <div>
                  <input type="text" required="true" name="unitPrice" value={formData.unitPrice} onChange={handleChange} />
                  <label alt='Enter the Unit Price' placeholder='Unit Price'></label>
                </div>
                <div>
                  <input type="text" required="true" name="totalPrice" value={formData.totalPrice} onChange={handleChange} />
                  <label alt='Enter the Total Price' placeholder='Total Price'></label>
                </div>
              </div>
              <div className="form-button-container">
                <button type="button" value="nextEntry" onClick={addMore}>Add More</button>
                <button type="submit">Submit</button>
                <button type="button" value="reset" onClick={resetForm}>Reset</button>
              </div>
            </div>
            <div className="productDescContainer">
              <div></div>
              <div>
                <input type="text" required="true" name="customerName" value={formData.customerName} onChange={handleChange} />
                <label alt='Enter the Customer Name' placeholder='Customer Name'></label>
              </div>
              <div>
                <input type="text" required="true" name="consigneeName" value={formData.consigneeName} onChange={handleChange} />
                <label alt='Enter the Consignee Name' placeholder='Consignee Name'></label>
              </div>
              <div>
                <textarea
                  required={true}
                  name="productDesc"
                  value={formData.productDesc}
                  className={formData.productDesc.trim() == '' ? 'textAreaEmpty' : 'textAreaFilled'}
                  readOnly
                ></textarea>
                <label alt='Enter the Product Description' placeholder='Product Description'></label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
