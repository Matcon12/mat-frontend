import { DatePicker, Space, Select } from "antd"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faArrowsRotate } from "@fortawesome/free-solid-svg-icons"
import "./ProductDetails.css"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent"

export default function ProductDetails({
  index,
  formData,
  setFormData,
  handleChange,
  suggestions,
  setSuggestions,
  filteredSuggestions,
  setFilteredSuggestions,
  handleSuggestionClick,
  handleInputChange,
  onProductDateChange,
  setTotal,
  handleProductDelete,
  handleProductClear,
  productValidation,
  productLength,
}) {
  useEffect(() => {
    let total = parseFloat(formData.quantity * formData.unitPrice)

    setTotal(total.toFixed(2), index)
  }, [formData.quantity, formData.unitPrice])

  const [isFocused, setIsFocused] = useState(false)

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
    <>
      {formData &&
        formData.map((productDetail, index) => {
          return (
            <>
              <hr />
              <div className="product-desc-only-inputs">
                <div className="productDescContainer">
                  <div>
                    {index == productLength - 1 && productValidation.poSlNo ? (
                      <p className="error">{productValidation.poSlNo}</p>
                    ) : (
                      // <p>&nbsp;</p>
                      <p></p>
                    )}
                    <input
                      type="text"
                      required={true}
                      name="poSlNo"
                      value={formData.poSlNo}
                      onChange={(e) => handleChange(index, e)}
                      placeholder=" "
                    />
                    <label
                      alt="Enter the PO SL No"
                      placeholder="PO SL No"
                    ></label>
                  </div>
                  {console.log("main data: ", formData)}
                  <div className="autocomplete-wrapper">
                    <AutoCompleteComponent
                      data={suggestions}
                      setData={setSuggestions}
                      mainData={formData}
                      setMainData={setFormData}
                      filteredData={filteredSuggestions}
                      setFilteredData={setFilteredSuggestions}
                      name="prodId"
                      placeholder="Product Code"
                      search_value="prod_id"
                      array={true}
                      index={index}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      // required={true}
                      name="packSize"
                      value={formData.packSize}
                      onChange={(e) => handleChange(index, e)}
                      placeholder=" "
                    />
                    <label
                      alt="Enter the Pack Size"
                      placeholder="Pack Size"
                    ></label>
                  </div>
                  <div className="grid-item-textarea">
                    <textarea
                      // required={true}
                      name="productDesc"
                      value={formData.productDesc}
                      // className={
                      //   formData.productDesc.trim() == ""
                      //     ? "textAreaEmpty"
                      //     : "textAreaFilled"
                      // }
                      onChange={(e) => handleChange(index, e)}
                      placeholder=" "
                    ></textarea>
                    <label
                      alt="Enter the Product Description"
                      placeholder="Product Description"
                    ></label>
                  </div>
                  <div className="grid-item-textarea">
                    {/* <Select
mode="tags"
style={{
  width: "100%",
}}
name="additionalDesc"
onChange={(e) => handleMultipleSelectChange(index, e)}
tokenSeparators={[","]}
options={options}
placeholder={additionalDescPlaceholder}
onFocus={descPlaceholderOnFocus}
onBlur={descPlaceholderOnBlur}
value={formData.additionalDesc}
/> */}
                    {/* <label className="additionalDescLabel">
          Additional Desc
        </label> */}

                    <input
                      type="text"
                      // required={true}
                      name="msrr"
                      value={formData.msrr}
                      onChange={(e) => handleChange(index, e)}
                      placeholder=" "
                    />
                    <label
                      alt="Enter the MSRR Number"
                      placeholder="Specifications"
                    ></label>
                  </div>

                  {/* <div className="grid-item-textarea">
<textarea
  // required={true}
  name="omat"
  value={formData.omat}
  // className={
  //   formData.productDesc.trim() == ""
  //     ? "textAreaEmpty"
  //     : "textAreaFilled"
  // }
  onChange={(e) => handleChange(index, e)}
  placeholder=" "
></textarea>
<label alt="Enter the OMAT Number" placeholder="OMAT Number"></label>
</div> */}
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      // required={true}
                      name="quantity"
                      value={formData.quantity}
                      onChange={(e) => handleChange(index, e)}
                      placeholder=" "
                    />
                    <label
                      alt="Enter the Quantity"
                      placeholder="Quantity"
                    ></label>
                  </div>
                  <div>
                    <input
                      type="number"
                      // required={true}
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={(e) => handleChange(index, e)}
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
                      // required={true}
                      name="totalPrice"
                      value={formData.totalPrice}
                      onChange={(e) => handleChange(index, e)}
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
                      type="text"
                      // required={true}
                      name="hsn_sac"
                      value={formData.hsn_sac}
                      onChange={(e) => handleChange(index, e)}
                      placeholder=" "
                    />
                    <label
                      alt="Enter the HSN/SAC"
                      placeholder="HSN/SAC Code:"
                    ></label>
                  </div>
                  {/* <div>
<input
  type="text"
  required={true}
  name="uom"
  value={formData.uom}
  onChange={(e) => handleChange(index, e)}
/>
<label alt="Enter the UOM" placeholder="UOM"></label>
</div> */}

                  <div className="input-container">
                    <select
                      name="uom"
                      value={formData.uom}
                      onChange={(e) => handleChange(index, e)}
                      // required
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
                  </div>
                  <div className="deliveryDate">
                    <div className="datePickerContainer">
                      <Space direction="vertical">
                        <DatePicker
                          onChange={productDateHandle}
                          value={
                            formData.deliveryDate
                              ? dayjs(formData.deliveryDate, "DD-MM-YYYY")
                              : ""
                          }
                          format="DD-MM-YYYY"
                          placeholder={"Delivery Date"}
                        />
                        {formData.deliveryDate && (
                          <label className="deliveryLabel">Delivery Date</label>
                        )}
                      </Space>
                    </div>
                  </div>
                </div>
                <div className="clearAndDeleteContainer">
                  {index == 0 && (
                    <div className="clear_current_product">
                      {/* <button type="button" onClick={() => handleProductClear(index)}>Clear</button> */}
                      <FontAwesomeIcon
                        className="clearButton"
                        icon={faArrowsRotate}
                        onClick={() => handleProductClear(index)}
                      />
                    </div>
                  )}
                  {index != 0 && (
                    <>
                      <div className="delete_current_product">
                        {/* <button type="button" onClick={() => handleProductDelete(index)}> */}
                        <FontAwesomeIcon
                          className="deleteButton"
                          icon={faTrash}
                          onClick={() => handleProductDelete(index)}
                        />
                      </div>
                      <div className="clear_current_product">
                        {/* <button type="button" onClick={() => handleProductClear(index)}>Clear</button> */}
                        <FontAwesomeIcon
                          className="clearButton"
                          icon={faArrowsRotate}
                          onClick={() => handleProductClear(index)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )
        })}
    </>
  )
}
