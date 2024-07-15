import { useState, useEffect, useCallback } from "react"
import "./Invoice.css"
import { useNavigate } from "react-router-dom"
import api from "../../api/api.jsx"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent.jsx"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function Invoice() {
  const initialFormData = {
    poNo: "",
    customerId: "",
    consigneeId: "",
    newConsigneeId: "",
    customerData: [],
    totalEntries: "",
    contactName: "",
    freight: false,
    insurance: false,
    freightCharges: "",
    insuranceCharges: "",
    otherCharges: "",
  }
  const [formData, setFormData] = useState(initialFormData)

  const [entries, setEntries] = useState([])
  const [show, setShow] = useState(false)
  const [purchaseOrder, setPurchaseOrder] = useState([])
  const [filteredPurchaseData, setFilteredPurchaseData] = useState([])
  // const [contactName, setContactName] = useState("")
  const [contactOptions, setContactOptions] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [filteredCustomerData, setFilteredCustomerData] = useState([])

  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([])
  const [poSlNo, setPoSlNo] = useState("")

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  useEffect(() => {
    api.get("/getCustomerData").then((response) => {
      setCustomerData(response.data.customerData)
    })
  }, [])

  useEffect(() => {
    console.log(formData.contactName)
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault()

    const transformedEntries = entries.map((entry) => {
      const quantitiesSum = entry.quantities.reduce(
        (sum, quantity) => sum + Number(quantity),
        0
      )
      return {
        poSlNo: entry.poSlNo,
        hsnSac: entry.hsnSac,
        quantities: quantitiesSum,
        noOfBatches: entry.noOfBatches,
        batch_coc_quant: {
          batch: entry.batches,
          coc: entry.cocs,
          quantity: entry.quantities,
        },
      }
    })

    const formData2 = {
      customerId: formData.customerId,
      consigneeName: formData.consigneeId,
      newConsigneeName: formData.newConsigneeId,
      contactName: formData.contactName,
      poNo: formData.poNo,
      items: transformedEntries,
      freightCharges: formData.freightCharges,
      insuranceCharges: formData.insuranceCharges,
      otherCharges: formData.otherCharges,
    }

    console.log({ formData2 })
    api
      .post(
        "/invoiceProcessing",
        {
          formData2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        navigate("print_invoice", {
          state: { gcn_no: response.data.gcn_no },
        })
      })
      .catch((error) => {
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
      })
  }

  const handleChange = (entryIndex, fieldIndex, field, value) => {
    const newEntries = [...entries]
    if (field === "noOfBatches") {
      const noOfBatches = Number(value)
      newEntries[entryIndex].noOfBatches = noOfBatches
      newEntries[entryIndex].quantities = Array.from(
        { length: noOfBatches },
        (_, i) => newEntries[entryIndex].quantities[i] || ""
      )
      newEntries[entryIndex].batches = Array.from(
        { length: noOfBatches },
        (_, i) => newEntries[entryIndex].batches[i] || ""
      )
      newEntries[entryIndex].cocs = Array.from(
        { length: noOfBatches },
        (_, i) => newEntries[entryIndex].cocs[i] || ""
      )
    } else {
      newEntries[entryIndex][field][fieldIndex] = value
    }
    setEntries(newEntries)
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const purchaseFields = (e) => {
    e.preventDefault()

    if (formData.poNo) {
      setShow(true)
      setEntries(
        Array.from({ length: Number(formData.totalEntries) }, () => ({
          noOfBatches: 1,
          poSlNo: "",
          hsnSac: "",
          quantities: [""],
          batches: [""],
          cocs: [""],
        }))
      )
    } else {
      toast.warning("Enter PO No.")
    }
  }

  const getData = () => {
    api
      .get("/getInvoiceData", {
        params: { poNo: formData.poNo },
      })
      .then((response) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          customerId: response.data.invoice_header_data.customerId,
          consigneeId: response.data.invoice_header_data.consigneeId,
          contactName: response.data.invoice_header_data.contact_names[0],
        }))
        setContactOptions(response.data.invoice_header_data.contact_names)
        setPurchaseOrderDetails(response.data.result)
      })
      .catch((error) => {
        // resetForm()
        console.error(error)
      })
  }

  useEffect(() => {
    api.get("/getPurchaseOrder").then((response) => {
      setPurchaseOrder(response.data.distinct_pono)
    })
  }, [])

  useEffect(() => {
    getData()
  }, [formData.poNo])

  const handleCheckboxChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.checked,
    }))
    console.log(formData)
  }

  return (
    <div className="invoice-generation-container">
      <h1>Invoice Generation</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="invoice-input-container">
          <div className="autocomplete-wrapper autocomplete-wrapper-invoice">
            <AutoCompleteComponent
              data={purchaseOrder}
              mainData={formData}
              setData={setPurchaseOrder}
              setMainData={setFormData}
              filteredData={filteredPurchaseData}
              setFilteredData={setFilteredPurchaseData}
              name="poNo"
              placeholder="Customer PO No."
              search_value="pono"
            />
          </div>
          <div>
            <input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label
              alt="Enter the Customer ID"
              placeholder="Customer ID"
            ></label>
          </div>
          <div>
            <input
              type="text"
              name="consigneeId"
              value={formData.consigneeId}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label
              alt="Enter the Consignee Name"
              placeholder="Consignee Name"
            ></label>
          </div>
          <div className="autocomplete-wrapper autocomplete-wrapper-invoice">
            <AutoCompleteComponent
              data={customerData}
              mainData={formData}
              setData={setCustomerData}
              setMainData={setFormData}
              filteredData={filteredCustomerData}
              setFilteredData={setFilteredCustomerData}
              name="newConsigneeId"
              placeholder="Consignee Name (if required)"
              search_value="cust_id"
            />
          </div>
          <div className="input-container-contact">
            <select
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              {contactOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label alt="Select an Option" placeholder="Contact Name"></label>
          </div>

          <div>
            <input
              type="text"
              name="freightCharges"
              value={formData.freightCharges}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label
              alt="Enter the Freight Charges"
              placeholder="Freight Charges"
            ></label>
          </div>
          <div>
            <input
              type="text"
              name="insuranceCharges"
              value={formData.insuranceCharges}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label
              alt="Enter the Insurance Charges"
              placeholder="Insurance Charges"
            ></label>
          </div>
          <div>
            <input
              type="text"
              name="otherCharges"
              value={formData.otherCharges}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label
              alt="Enter the Other Charges"
              placeholder="Other Charges"
            ></label>
          </div>
          <div>
            <input
              type="text"
              name="totalEntries"
              value={formData.totalEntries}
              onChange={handleInputChange}
              placeholder=" "
            />
            <label
              alt="Enter the number of entries"
              placeholder="Total Entries"
            ></label>
          </div>
          <button
            className="PurchaseEntryButton"
            type="button"
            onClick={purchaseFields}
          >
            Enter Purchase Orders
          </button>
        </div>
        <div>
          {show && (
            <div className="invoice-input-complete-container">
              {Array.isArray(entries) &&
                entries.map((entry, entryIndex) => (
                  <div key={entryIndex} className="individual-container">
                    <p>Entry {entryIndex + 1}</p>
                    <div className="invoice-form-input-container">
                      <div className="invoice-form-input-only-headers">
                        <div className="noOfBatches">
                          <input
                            type="text"
                            name="noOfBatches"
                            value={entry.noOfBatches}
                            onChange={(e) =>
                              handleChange(
                                entryIndex,
                                null,
                                "noOfBatches",
                                e.target.value
                              )
                            }
                            placeholder=" "
                          />
                          <label
                            alt="Enter the number of Batches"
                            placeholder="Number of Batches"
                          ></label>
                        </div>
                        <div className="autocomplete-wrapper">
                          <AutoCompleteComponent
                            data={purchaseOrderDetails}
                            mainData={entries}
                            setData={setPurchaseOrderDetails}
                            setMainData={setEntries}
                            filteredData={filteredCustomerData}
                            handleArrayChange={(e) =>
                              handleChange(
                                entryIndex,
                                null,
                                "poSlNo",
                                e.target.value
                              )
                            }
                            setFilteredData={setFilteredCustomerData}
                            name="poSlNo"
                            placeholder="PO Sl No."
                            search_value="po_sl_no"
                            setPoSlNo={setPoSlNo}
                            array={true}
                            index={entryIndex}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="hsnSac"
                            value={entry.hsnSac}
                            onChange={(e) =>
                              handleChange(
                                entryIndex,
                                null,
                                "hsnSac",
                                e.target.value
                              )
                            }
                            placeholder=" "
                          />
                          <label
                            alt="Enter the hsn/sac"
                            placeholder="HSN/SAC"
                          ></label>
                        </div>
                      </div>
                      <div className="individual-batches">
                        {entry.quantities.map((quantity, fieldIndex) => (
                          <div>
                            <p>Batch: {fieldIndex + 1}</p>
                            <div className="batch_quant" key={fieldIndex}>
                              <div>
                                <input
                                  type="text"
                                  name={`quantity-${fieldIndex}`}
                                  value={quantity}
                                  onChange={(e) =>
                                    handleChange(
                                      entryIndex,
                                      fieldIndex,
                                      "quantities",
                                      e.target.value
                                    )
                                  }
                                  placeholder=" "
                                />
                                <label
                                  alt="Enter the quantity"
                                  placeholder="Quantity"
                                ></label>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  name={`batch-${fieldIndex}`}
                                  value={entry.batches[fieldIndex]}
                                  onChange={(e) =>
                                    handleChange(
                                      entryIndex,
                                      fieldIndex,
                                      "batches",
                                      e.target.value
                                    )
                                  }
                                  placeholder=" "
                                />
                                <label
                                  alt="Enter the batch no."
                                  placeholder="Batch No."
                                ></label>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  name={`coc-${fieldIndex}`}
                                  value={entry.cocs[fieldIndex]}
                                  onChange={(e) =>
                                    handleChange(
                                      entryIndex,
                                      fieldIndex,
                                      "cocs",
                                      e.target.value
                                    )
                                  }
                                  placeholder=" "
                                />
                                <label
                                  alt="Enter the COC No."
                                  placeholder="COC No."
                                ></label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              <div className="submit-button">
                <button type="submit">Submit</button>
              </div>
            </div>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
