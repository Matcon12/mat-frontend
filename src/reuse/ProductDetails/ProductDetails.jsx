import { DatePicker, Space, Select } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import "./ProductDetails.css";

export default function ProductDetails({
  index,
  formData,
  handleChange,
  suggestions,
  handleSuggestionClick,
  // handleSelectChange,
  options,
  handleInputChange,
  additionalDescPlaceholder,
  descPlaceholderOnFocus,
  descPlaceholderOnBlur,
  onProductDateChange,
  setTotal,
  handleMultipleSelectChange,
  // onDeliveryDateChange,
  handleProductDelete,
  handleProductClear,
  productValidation,
  productLength
}) {

  console.log('formData: ', productLength)

  useEffect(() => {
    let total = formData.quantity * formData.unitPrice

    setTotal(total.toFixed(2), index);
  }, [formData.quantity, formData.unitPrice]);


  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const productDateHandle = (date, dateStr) => {
    onProductDateChange(date, index, dateStr)
  }

  // const productDateHandle(date, dateStr) => {
  //   onProductDateChange(date, index, dateStr)
  // }

  // console.log('index: ', index, numberOfProduct - 1)
  return (
    <div className="productDescContainer">
      <div>
        {index == productLength - 1 && productValidation.poSlNo ? <p className='error'>{productValidation.poSlNo}</p> : <p>&nbsp;</p>}
        <input type="text" required={true} name="poSlNo" value={formData.poSlNo} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the PO SL No' placeholder='PO SL No'></label>
      </div>
      <div className="autocomplete-wrapper">
        <input type="text" required={true} name="prodId" value={formData.prodId} onChange={(e) => handleInputChange(index, e)} onFocus={handleFocus} onBlur={handleBlur} aria-autocomplete="list" aria-controls="autocomplete-list" />
        {/* <input type="text" required={true} name="prodId" value={formData.prodId} onChange={(e) => handleInputChange(index, e)} onFocus={(e) => handleFocus(index, e)} onBlur={(e) => handleBlur(index, e)} aria-autocomplete="list" aria-controls="autocomplete-list" /> */}
        <label alt='Enter the Product Code' placeholder='Product Code'></label>
        {isFocused && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, i) => (
              <li
                key={i}
                onMouseDown={() => handleSuggestionClick(suggestion, index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <input type="text" required={true} name="packSize" value={formData.packSize} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Pack Size' placeholder='Pack Size'></label>
      </div>
      <div className="grid-item-textarea">
        <textarea
          required={true}
          name="productDesc"
          value={formData.productDesc}
          className={formData.productDesc.trim() == '' ? 'textAreaEmpty' : 'textAreaFilled'}
          onChange={(e) => handleChange(index, e)}
        ></textarea>
        <label alt='Enter the Product Description' placeholder='Product Description'></label>
      </div>
      <div className="grid-item-textarea">
        <Select
          mode="tags"
          style={{
            width: '100%',
          }}
          name="additionalDesc"
          onChange={(e) => handleMultipleSelectChange(index, e)}
          tokenSeparators={[',']}
          options={options}
          placeholder={additionalDescPlaceholder}
          onFocus={descPlaceholderOnFocus}
          onBlur={descPlaceholderOnBlur}
          value={formData.additionalDesc}
        />
        {/* <label className="additionalDescLabel">
                    Additional Desc
                  </label> */}
      </div>
      <div>
        <input type="text" required={true} name="quantity" value={formData.quantity} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Quantity' placeholder='Quantity'></label>
      </div>
      <div>
        <input type="text" required={true} name="unitPrice" value={formData.unitPrice} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Unit Price' placeholder='Unit Price'></label>
      </div>
      <div>
        <input type="text" required={true} name="totalPrice" value={formData.totalPrice} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Total Price' placeholder='Total Price'></label>
      </div>
      <div className="deliveryDate">
        <div className="datePickerContainer">
          <Space direction="vertical">
            <DatePicker onChange={productDateHandle} value={formData.deliveryDate ? dayjs(formData.deliveryDate) : ""} placeholder={'Delivery Date'} />
            {formData.deliveryDate && (
              <label className="deliveryLabel">
                Delivery Date
              </label>
            )}
          </Space>
        </div>
      </div>
      <div className="clearAndDeleteContainer">
        {
          index == 0 &&
          <div className="clear_current_product">
            {/* <button type="button" onClick={() => handleProductClear(index)}>Clear</button> */}
            <FontAwesomeIcon className='clearButton' icon={faArrowsRotate} onClick={() => handleProductClear(index)} />
          </div>
        }
        {
          index != 0 &&
          <>
            <div className="delete_current_product">
              {/* <button type="button" onClick={() => handleProductDelete(index)}> */}
              <FontAwesomeIcon className='deleteButton' icon={faTrash} onClick={() => handleProductDelete(index)} />
            </div>
            <div className="clear_current_product">
              {/* <button type="button" onClick={() => handleProductClear(index)}>Clear</button> */}
              <FontAwesomeIcon className='clearButton' icon={faArrowsRotate} onClick={() => handleProductClear(index)} />
            </div>
          </>
        }
      </div>
    </div>
  )
}