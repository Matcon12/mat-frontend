import { useEffect, useState } from "react";
import './customer.css';
import possibleValues from '../../../data.js';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar.jsx";
import { DatePicker, Space } from 'antd';
import ProductDetails from "../../reuse/ProductDetails/ProductDetails.jsx";
import dayjs from 'dayjs';

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
  };

  const initialProductDetails = {
    poSlNo: "",
    prodId: "",
    packSize: "",
    productDesc: "",
    additionalDesc: [],
    quantity: "",
    unitPrice: "",
    totalPrice: "",
    deliveryDate: ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [productDetails, setProductDetails] = useState([initialProductDetails]);
  const [suggestions, setSuggestions] = useState([]);

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

  const handleProductChange = (key, event) => {
    const { name, value } = event.target;

    setProductDetails(productDetails.map(productDetail => {
      if (productDetails.indexOf(productDetail) == key) {
        return { ...productDetail, [name]: value };
      }
      return productDetail;
    }));
  }

  const handleMultipleSelectChange = (key, event) => {
    const updatedProductDetails = [...productDetails];
    updatedProductDetails[key].additionalDesc = event;
    setProductDetails(updatedProductDetails);
    console.log(productDetails)
  }

  // const onDeliveryDateChange = (e, dateStr) => {
  //   setProductDetails(productDetails.map((productDetail, idx) => {
  //     if (idx === index) {
  //       return { ...productDetail, deliveryDate: event };
  //     }
  //     return productDetail;
  //   }));
  //   console.log(productDetails);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/purchase_order/submitForm',
      {
        formData: formData,
        productDetails: productDetails
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  }

  const resetForm = () => {
    setFormData(initialFormData);
    setProductDetails([initialProductDetails])
  }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    console.log('name: ', name, 'value:', value, 'index:', index);
    setProductDetails(productDetails.map(productDetail => {
      if (productDetails.indexOf(productDetail) == index) {
        return { ...productDetail, [name]: value };
      }
      return productDetail;
    }));
    if (value.length > 0) {
      const filteredSuggestions = possibleValues.filter(suggestion =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : ['No matches found']);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value, index) => {
    setProductDetails(productDetails.map((productDetail, idx) => {
      console.log(value)
      if (idx == index) {
        return { ...productDetail, ['prodId']: value };
      }
      return productDetail;
    }));
    setSuggestions([]);
    getPackSizeAndDesc(value, index);
  };

  const getPackSizeAndDesc = (value, index) => {
    axios.get('http://127.0.0.1:8000/purchase_order/packSize', {
      params: {
        prodId: value
      }
    })
      .then(response => {
        setProductDetails(productDetails.map((productDetail, idx) => {
          if (idx === index) {
            return { ...productDetail, prodId: value, packSize: response.data.pack_size, productDesc: response.data.prod_desc };
          }
          return productDetail;
        }));
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  }


  const onDateChange = (date, dateString) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      poDate: dateString
    }))
  }

  const onProductDateChange = (date, index, dateStr) => {
    console.log(dateStr)
    setProductDetails(productDetails.map((productDetail, idx) => {
      if (idx === index) {
        return { ...productDetail, deliveryDate: dateStr };
      }
      return productDetail;
    }));
  }

  console.log('productDetails: ', productDetails);

  const setTotal = (total, index) => {
    setProductDetails(productDetails.map(productDetail => {
      if (productDetails.indexOf(productDetail) == index) {
        return { ...productDetail, ['totalPrice']: total };
      }
      return productDetail;
    }));
  }

  const handleProductDelete = (index) => {
    setProductDetails(productDetails.filter((productDetail, idx) => idx !== index));
  }

  const handleProductClear = (index) => {
    const updatedProductDetails = [...productDetails];

    updatedProductDetails[index] = { ...initialProductDetails };

    setProductDetails(updatedProductDetails);
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

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleSelectChange = (value) => {
    console.log(`selected ${value}`);
  };

  let additionalDescPlaceholder = 'Additional Description';
  const descPlaceholderOnFocus = () => {
    additionalDescPlaceholder = ''
  }
  const descPlaceholderOnBlur = () => {
    additionalDescPlaceholder = 'Additional Description'
  }

  const addMore = () => {
    setProductDetails((prevProductDetails) => ([
      ...prevProductDetails, initialProductDetails
    ]))
  }

  return (
    <div className="customer-container">
      <Sidebar />
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
                    <DatePicker onChange={onDateChange} value={formData.poDate ? dayjs(formData.poDate) : ""} placeholder={'PO Date'} />
                  </Space>
                  {formData.poDate && (
                    <label className="poLabel">
                      PO Date
                    </label>
                  )}
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
                  <input type="text" required="true" name="customerName" value={formData.customerName} onChange={handleChange} />
                  <label alt='Enter the Customer Name' placeholder='Customer Name'></label>
                </div>
                <div>
                  <input type="text" required="true" name="consigneeName" value={formData.consigneeName} onChange={handleChange} />
                  <label alt='Enter the Consignee Name' placeholder='Consignee Name'></label>
                </div>
              </div>
              {productDetails && productDetails.map((productDetail, index) => {
                return (
                  <>
                    <hr />
                    <ProductDetails
                      key={index}
                      index={index}
                      formData={productDetail}
                      handleChange={handleProductChange}
                      suggestions={suggestions}
                      handleSuggestionClick={handleSuggestionClick}
                      handleSelectChange={handleSelectChange}
                      options={options}
                      handleInputChange={handleInputChange}
                      additionalDescPlaceholder={additionalDescPlaceholder}
                      descPlaceholderOnFocus={descPlaceholderOnFocus}
                      descPlaceholderOnBlur={descPlaceholderOnBlur}
                      onProductDateChange={onProductDateChange}
                      setTotal={setTotal}
                      handleMultipleSelectChange={handleMultipleSelectChange}
                      handleProductDelete={handleProductDelete}
                      handleProductClear={handleProductClear} />
                  </>
                )
              }
              )}

            </div>
            <div className="form-button-container">
              <button type="button" value="nextEntry" onClick={addMore}>Add More</button>
              <button type="submit">Submit</button>
              <button type="button" value="reset" onClick={resetForm}>Reset</button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  )
}
