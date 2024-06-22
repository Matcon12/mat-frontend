import React, { useState, useRef } from "react"
import "./InvoicePrint.css"
import { useReactToPrint } from "react-to-print"
import Invoice from "../../components/Invoice/Invoice"
import api from "../../api/api"

export default function InvoiceReport() {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    year: "2024-25",
  })

  const [responseData, setResponseData] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  console.log("formdata: ", formData)

  const generateGcnNumber = (gst_rate, fin_year, fyear) => {
    const padWithZeros = (number, length) => {
      return number.toString().padStart(length, "0")
    }

    const gcn_no = formData.invoiceNumber
    return `${padWithZeros(gcn_no, 3)}/${formData.year}`
  }

  const InvoiceC = React.forwardRef((props, ref) => (
    <div ref={ref} className="invoice-container-container">
      <Invoice ref={ref} formData={responseData} />
    </div>
  ))

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .get("/invoiceGeneration", {
        params: {
          gcn_no: generateGcnNumber,
        },
      })
      .then((response) => {
        setResponseData(response.data.context)
        console.log(response.data.context)
      })
      .catch((error) => {
        console.log(error.response.data.error)
      })
  }

  return (
    <div className="invoice-report-container">
      <div className="input-details-container">
        <h3>Invoice No.</h3>
        <form onSubmit={handleSubmit} className="input-details-form">
          <div>
            <input
              type="text"
              name="invoiceNumber"
              /*required={true}*/
              value={formData.invoiceNumber}
              onChange={handleChange}
              placeholder=" "
            />
            <label
              alt="Enter the Invoice Number"
              placeholder="Invoice Number"
            ></label>
          </div>
          <div>
            <input
              type="text"
              name="year"
              /*required={true}*/
              value={formData.year}
              onChange={handleChange}
              placeholder=" "
            />
            <label alt="Enter the year" placeholder="Year"></label>
          </div>
          <button type="submit">Get Invoice</button>
        </form>

        {responseData && (
          <>
            <InvoiceC ref={componentRef} />
            <div>
              <button onClick={handlePrint}>Print this out!</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
