import { useState, useEffect } from "react"
import "./Invoice.css"
import { useNavigate } from "react-router-dom"
import api from "../../api/api.jsx"
import AutoCompleteComponent from "../../components/AutoComplete/AutoCompleteComponent.jsx"

export default function Invoice() {
  const [customerId, setCustomerId] = useState("")
  const [consigneeName, setConsigneeName] = useState("")
  const [newConsigneeName, setNewConsigneeName] = useState("")
  const [poNo, setPoNo] = useState("")
  const [totalEntries, setTotalEntries] = useState()
  const [entries, setEntries] = useState([])

  const [show, setShow] = useState(false)
  const [purchaseOrder, setPurchaseOrder] = useState()
  const [filteredPurchaseData, setFilteredPurchaseData] = useState()
  const [contactName, setContactName] = useState()
  const [contactOptions, setContactOptions] = useState([])

  // const initialFormData = {
  //   customerId: "",
  //   consigneeName: "",
  //   newConsigneeName: "",
  //   contactName: "",
  //   poNo: "",
  //   totalEntries: "",
  //   entries: [],
  // }

  // const [formData, setFormData] = useState(initialFormData)
  const [customerData, setCustomerData] = useState(0)
  const [filteredCustomerData, setFilteredCustomerData] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    api.get("/getCustomerData").then((response) => {
      setCustomerData(response.data.customerData)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      customerId,
      consigneeName,
      newConsigneeName,
      contactName,
      poNo,
      items: entries,
    }

    console.log(formData)
    api
      .post(
        "/invoiceProcessing",
        {
          formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        resetForm()
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

  console.log("entries: ", entries)

  const resetForm = () => {
    setCustomerId("")
    setConsigneeName("")
    setNewConsigneeName("")
    setPoNo("")
    setTotalEntries("")
    setEntries([])
  }

  const purchaseFields = (e) => {
    e.preventDefault()
    setShow(true)

    // Initialize entries state based on totalEntries
    setEntries(
      Array.from({ length: Number(totalEntries) }, () => ({
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
        params: { poNo: poNo.poNo },
      })
      .then((response) => {
        setConsigneeName(response.data.invoice_header_data.consignee_id)
        setCustomerId(response.data.invoice_header_data.cust_id)
        setContactOptions(response.data.invoice_header_data.contact_names)
        setContactName(response.data.contact[0])
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    api.get("/getPurchaseOrder").then((response) => {
      setPurchaseOrder(response.data.distinct_pono)
      console.log("response: ", response.data.distinct_pono)
    })
  }, [])

  useEffect(() => {
    getData()
  }, [poNo])

  return (
    <div className="invoice-generation-container">
      <h1>Invoice Generation</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="invoice-input-container">
          {/* <div>
            <input
              type="text"
              required={true}
              name="poNo"
              value={poNo}
              onChange={(e) => setPoNo(e.target.value)}
              onBlur={getData}
            />
            <label alt="Enter the PO No" placeholder="PO No"></label>
          </div> */}
          <div className="autocomplete-wrapper autocomplete-wrapper-invoice">
            <AutoCompleteComponent
              data={purchaseOrder}
              mainData={poNo}
              setData={setPurchaseOrder}
              setMainData={setPoNo}
              handleChange={handleChange}
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
              // required={true}
              name="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
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
              // required={true}
              name="consigneeName"
              value={consigneeName}
              onChange={(e) => setConsigneeName(e.target.value)}
              placeholder=" "
            />
            <label
              alt="Enter the Consignee Name"
              placeholder="Consignee Name"
            ></label>
          </div>
          {/* <div>
            <input
              type="text"
              name="newConsigneeName"
              // required={true}
              value={newConsigneeName}
              onChange={(e) => setNewConsigneeName(e.target.value)}
              placeholder=" "
            />
            <label
              alt="Enter the new Consignee Name"
              placeholder="New Consignee Name(if required)"
            ></label>
          </div> */}
          <div className="autocomplete-wrapper autocomplete-wrapper-invoice">
            <AutoCompleteComponent
              data={customerData}
              mainData={newConsigneeName}
              setData={setCustomerData}
              setMainData={setConsigneeName}
              handleChange={handleChange}
              filteredData={filteredCustomerData}
              setFilteredData={setFilteredCustomerData}
              name="newConsigneeName"
              placeholder="ConsigneeName (if required)"
              search_value="cust_id"
            />
          </div>
          <div className="input-container-contact">
            <select
              name="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            // required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value={contactOptions[0]}>{contactOptions[0]}</option>
              <option value={contactOptions[1]}>{contactOptions[1]}</option>
            </select>
            <label alt="Select an Option" placeholder="Contact Name"></label>
          </div>
          <div>
            <input
              type="text"
              name="totalEntries"
              // required={true}
              value={totalEntries}
              onChange={(e) => setTotalEntries(e.target.value)}
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
              {entries.map((entry, index) => (
                <div key={index}>
                  <p>Entry {index + 1}</p>
                  <div key={index} className="invoice-form-input-container">
                    <div>
                      <input
                        type="text"
                        // required={true}
                        name="poSlNo"
                        value={entry.poSlNo}
                        onChange={(e) => handleChange(index, e)}
                        placeholder=" "
                      />
                      <label
                        alt="Enter the PO Sl No."
                        placeholder="PO Sl No."
                      ></label>
                    </div>
                    <div>
                      <input
                        type="text"
                        // required={true}
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
                        // required={true}
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
                        // required={true}
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
                        // required={true}
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
