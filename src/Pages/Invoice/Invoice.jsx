import { useState, useEffect } from "react"
import "./Invoice.css"
import { useNavigate } from "react-router-dom"
import api from "../../api/api.jsx"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent.jsx"

export default function Invoice() {
  const initialFormData = {
    poNo: "",
    customerId: "",
    consigneeId: "",
    newConsigneeId: "",
    customerData: [],
    totalEntries: "",
    contactName: "",
  }
  const [formData, setFormData] = useState(initialFormData)

  const [entries, setEntries] = useState([])
  const [show, setShow] = useState(false)
  const [purchaseOrder, setPurchaseOrder] = useState([])
  const [filteredPurchaseData, setFilteredPurchaseData] = useState([])
  const [contactName, setContactName] = useState("")
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData2 = {
      customerId: formData.customerId,
      consigneeName: formData.consigneeId,
      newConsigneeName: formData.newConsigneeId,
      contactName: formData.contactName,
      poNo: formData.poNo,
      items: entries,
    }
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
      })
  }

  const handleChange = (index, e) => {
    const { name, value } = e.target
    const newEntries = [...entries]
    newEntries[index] = { ...newEntries[index], [name]: value }
    setEntries(newEntries)
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  const purchaseFields = (e) => {
    e.preventDefault()
    setShow(true)
    setEntries(
      Array.from({ length: Number(formData.totalEntries) }, () => ({
        poSlNo: "",
        quantity: "",
        hsnSac: "",
        batch: "",
        coc: "",
      }))
    )
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

          {show && (
            <div className="invoice-input-complete-container">
              {Array.isArray(entries) &&
                entries.map((entry, index) => (
                  <div key={index}>
                    <p>Entry {index + 1}</p>
                    <div className="invoice-form-input-container">
                      <div className="autocomplete-wrapper">
                        <AutoCompleteComponent
                          data={purchaseOrderDetails}
                          mainData={entries}
                          setData={setPurchaseOrderDetails}
                          setMainData={setEntries}
                          filteredData={filteredCustomerData}
                          handleArrayChange={(e) => handleChange(index, e)}
                          setFilteredData={setFilteredCustomerData}
                          name="poSlNo"
                          placeholder="PO Sl No."
                          search_value="po_sl_no"
                          setPoSlNo={setPoSlNo}
                          array={true}
                          index={index}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="quantity"
                          value={entry.quantity}
                          onChange={(e) => handleChange(index, e)}
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
                          name="hsnSac"
                          value={entry.hsnSac}
                          onChange={(e) => handleChange(index, e)}
                          placeholder=" "
                        />
                        <label
                          alt="Enter the hsn/sac"
                          placeholder="HSN/SAC"
                        ></label>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="batch"
                          value={entry.batch}
                          onChange={(e) => handleChange(index, e)}
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
                          name="coc"
                          value={entry.coc}
                          onChange={(e) => handleChange(index, e)}
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
              <div className="submit-button">
                <button type="submit">Submit</button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
