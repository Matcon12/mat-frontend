import { useState } from "react"

export default function InputField() {
  const initialInvoiceInput = {
    poSlNo: "",
    quantity: "",
  }

  const [invoiceInput, setInvoiceInput] = useState(initialInvoiceInput)

  const handleChange = (e) => {
    setInvoiceInput({ ...invoiceInput, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div>
        <input
          type="text"
          required={true}
          name="poSlNo"
          value={invoiceInput.poSlNo}
          onChange={handleChange}
        />
        <label alt="Enter the PO Sl NO." placeholder="PO Sl No."></label>
      </div>
      <div>
        <input
          type="text"
          required={true}
          name="quantity"
          value={invoiceInput.quantity}
          onChange={handleChange}
        />
        <label alt="Enter the quantity" placeholder="Quantity"></label>
      </div>
    </div>
  )
}
