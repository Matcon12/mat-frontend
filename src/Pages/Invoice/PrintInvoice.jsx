import Invoice from "../../components/Invoice/Invoice"
import { useLocation } from "react-router-dom"
import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import api from "../../api/api.jsx"
import "./Invoice.css"
import DcPrint from "../../components/DC/Dc.jsx"

export default function PrintInvoice() {
  const [formData, setFormData] = useState()
  const location = useLocation()
  const { gcn_no } = location.state

  useEffect(() => {
    api
      .get("/invoiceGeneration", {
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
  }, [gcn_no])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  console.log("formdata: ", formData)

  const InvoiceC = React.forwardRef((props, ref) => (
    <div ref={ref} className="invoice-container-container">
      <Invoice ref={ref} formData={formData} />
    </div>
  ))

  console.log("formData: ", formData)

  return (
    <div className="print-invoice-container">
      <h1>Print Invoice: {gcn_no}</h1>
      <div>
        <button onClick={handlePrint}>Print this out!</button>
      </div>
      <InvoiceC ref={componentRef} />
      {formData ? <DcPrint formData={formData} /> : ""}
    </div>
  )
}
