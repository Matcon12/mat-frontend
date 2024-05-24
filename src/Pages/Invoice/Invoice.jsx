import React, { useState } from "react"
import "./Invoice.css"

export default function Invoice() {
  const [customerId, setCustomerId] = useState("")
  const [poNo, setPoNo] = useState("")
  const [totalEntries, setTotalEntries] = useState()
  const [entries, setEntries] = useState([])
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(entries) // Process the entries as needed
  }

  const handleChange = (index, e) => {
    const { name, value } = e.target
    const newEntries = [...entries]
    newEntries[index] = { ...newEntries[index], [name]: value }
    setEntries(newEntries)
  }

  const purchaseFields = (e) => {
    e.preventDefault()
    setShow(true)

    // Initialize entries state based on totalEntries
    setEntries(
      Array.from({ length: Number(totalEntries) }, () => ({
        poSlNo: "",
        quantity: "",
      }))
    )
  }

  console.log(entries)

  return (
    <div className="invoice-generation-container">
      <h1>Invoice Generation</h1>
      <form onSubmit={handleSubmit}>
        <div className="invoice-input-container">
          <div>
            <input
              type="text"
              required={true}
              name="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <label
              alt="Enter the Customer ID"
              placeholder="Customer ID"
            ></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="poNo"
              value={poNo}
              onChange={(e) => setPoNo(e.target.value)}
            />
            <label alt="Enter the PO No" placeholder="PO No"></label>
          </div>
          <div>
            <input
              type="text"
              required={true}
              name="totalEntries"
              value={totalEntries}
              onChange={(e) => setTotalEntries(e.target.value)}
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
                <>
                  <p>Entry {index + 1}</p>
                  <div key={index} className="invoice-form-input-container">
                    <div>
                      <input
                        type="text"
                        required={true}
                        name="poSlNo"
                        value={entry.poSlNo}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <label
                        alt="Enter the PO Sl No."
                        placeholder="PO Sl No."
                      ></label>
                    </div>
                    <div>
                      <input
                        type="text"
                        required={true}
                        name="quantity"
                        value={entry.quantity}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <label
                        alt="Enter the quantity"
                        placeholder="Quantity"
                      ></label>
                    </div>
                  </div>
                </>
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
