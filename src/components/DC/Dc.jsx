import { Link } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import React, { useRef } from "react"

function DcReportC({ formData }) {
  return (
    <>
      <h2>DELIVERY CHALLAN</h2>
      <br />
      <br />
      <br />
      <br />
      <div className="dc-header">
        <div className="to-address">
          <p>
            To,
            <br />
            {/* International Aerospace Manufacturing Pvt Ltd <br />
            Survey No.3/1, Plot No. 2,3&4, ELCOT SEZ, <br />
            KRISHNAGIRI-635109, Tamil Nadu, India */}
            {formData.c.cust_addr1}
          </p>
        </div>
        <div className="dc-details">
          <p>DC NO. : {formData.odc[0].gcn_no}</p>
          <p>DATE : {formData.odc[0].gcn_date}</p>
          <p>P.O. No. : {formData.odc[0].po_no}</p>
          <p>DATE : {formData.odc[0].po_date}</p>
        </div>
      </div>
      <div className="message">
        <br />
        <br />
        <p>Kind Attn: {formData.odc1.contact_name}</p>
        <p>Mob No: {formData.odc1.contact_number}</p>
        <br />
        <br />
        <p>Dear Sir,</p>
        <br />
        <p>
          Please receive the goods in good considtion and acknowledge the same.
        </p>
        <br />
      </div>
      <div className="table">
        <table className="dc-table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th style={{ width: "250px" }}>Description of Goods</th>
              <th>QTY</th>
              <th>Pack Size</th>
              <th>Total Qty</th>
              <th>UOM</th>
              <th>Batch No.</th>
              <th>COC No.</th>
            </tr>
          </thead>
          <tbody>
            {formData.odc.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {data.prod_desc}
                    {data.additional_desc === "N/A"
                      ? ""
                      : [data.additional_desc]}
                  </td>
                  <td>{data.qty_delivered}</td>
                  <td>{data.pack_size}</td>
                  <td>{data.qty_delivered * parseFloat(data.pack_size)}</td>

                  <td>{data.uom}</td>
                  <td>{data.batch}</td>
                  <td>{data.coc}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="gst_no">
        <br />
        {/* <h3>GST NO: {formData.c.cust_gst_id}</h3> */}
        <h3>GST NO: 29AAPFM1882M1ZG</h3>
        <div></div>
        <br />
        <br />
        <br />
      </div>
      <div className="signature">
        <div className="matcon-signature">
          <h3>For MATCON</h3>
          <br />
          <br />
          <h3>Authorized Signatory</h3>
        </div>
        <div className="customer-signature">
          <h3>Customer Signature</h3>
        </div>
      </div>
    </>
  )
}
export default function DcPrint({ formData }) {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const DcReportComponent = React.forwardRef((props, ref) => (
    <div ref={ref} className="dc-report">
      <DcReportC ref={ref} formData={props.formData} />
    </div>
  ))

  return (
    <div>
      <div>
        <button onClick={handlePrint}>Print this out!</button>
      </div>
      <div className="dc-report-container" ref={componentRef}>
        <DcReportComponent formData={formData} />
      </div>
    </div>
  )
}
