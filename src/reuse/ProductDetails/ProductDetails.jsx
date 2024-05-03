
import { DatePicker, Space, Select } from 'antd';
import { useState, useEffect } from 'react';

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
  onDateChange,
  setTotal,
  handleMultipleSelectChange,
  onDeliveryDateChange
}) {

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

  return (
    <div className="productDescContainer">
      <div>
        <input type="text" required="true" name="poSlNo" value={formData.poSlNo} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the PO SL No' placeholder='PO SL No'></label>
      </div>
      <div className="autocomplete-wrapper">
        <input type="text" required="true" name="prodId" value={formData.prodId} onChange={(e) => handleInputChange(index, e)} onFocus={handleFocus} onBlur={handleBlur} aria-autocomplete="list" aria-controls="autocomplete-list" />
        {/* <input type="text" required="true" name="prodId" value={formData.prodId} onChange={(e) => handleInputChange(index, e)} onFocus={(e) => handleFocus(index, e)} onBlur={(e) => handleBlur(index, e)} aria-autocomplete="list" aria-controls="autocomplete-list" /> */}
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
        <input type="text" required="true" name="packSize" value={formData.packSize} onChange={(e) => handleChange(index, e)} />
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
        />
        {/* <label className="additionalDescLabel">
                    Additional Desc
                  </label> */}
      </div>
      <div>
        <input type="text" required="true" name="quantity" value={formData.quantity} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Quantity' placeholder='Quantity'></label>
      </div>
      <div>
        <input type="text" required="true" name="unitPrice" value={formData.unitPrice} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Unit Price' placeholder='Unit Price'></label>
      </div>
      <div>
        <input type="text" required="true" name="totalPrice" value={formData.totalPrice} onChange={(e) => handleChange(index, e)} />
        <label alt='Enter the Total Price' placeholder='Total Price'></label>
      </div>
      <div className="deliveryDate">
        <Space direction="vertical">
          <DatePicker onChange={(e) => onDeliveryDateChange(e)} placeholder={'Delivery Date'} format={"DD-MM-YYYY"} />
        </Space>
        {formData.deliveryDate && (
          <label className="deliveryLabel">
            Delivery Date
          </label>
        )}
      </div>
    </div>
  )
}