import Invoice from "../../components/Invoice/Invoice"
import { useLocation } from "react-router-dom"
import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"

export default function PrintInvoice() {
  const [formData, setFormData] = useState()
  const location = useLocation()
  const { gcn_no } = location.state
  const [num, setNum] = useState(0)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/purchase_order/invoiceGeneration", {
        params: {
          gcn_no: gcn_no,
        },
      })
      .then((response) => {
        setFormData(response.data.context)
        console.log(response.data.context)
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }, [gcn_no, num])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const InvoiceC = React.forwardRef((props, ref) => (
    <div ref={ref} className="invoice-container-container">
      <Invoice ref={ref} formData={formData} />
    </div>
  ))

  return (
    <div className="print-invoice-container">
      <h1>Print Invoice: {gcn_no}</h1>
      <button onClick={() => setNum(!num)}>click</button>
      <div>
        <button onClick={handlePrint}>Print this out!</button>
      </div>
      <InvoiceC ref={componentRef} />
    </div>
  )
}
