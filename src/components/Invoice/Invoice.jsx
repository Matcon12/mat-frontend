import "./Invoice.css"
import InvoiceDetails from "./InvoiceDetails/InvoiceDetails"
import TransportationMode from "./TransportationMode/TransportationMode"
import ReceiverDetails from "./ReceiverDetails/ReceiverDetails"
import ConsigneeDetails from "./ConsigneeDetails/ConsigneeDetails"
import POTable from "./POTable/POTable"
import InvoiceValue from "./InvoiceValue/InvoiceValue"
import Toc from "./Toc/Toc"

export default function Invoice({ formData }) {
  console.log("formData", formData)
  return (
    <>
      {formData ? (
        <div className="invoice-container">
          <p className="tax_invoice_heading">TAX INVOICE</p>
          <div className="column">
            <InvoiceDetails
              gcn_no={formData.odc1.gcn_no}
              gcn_date={formData.odc1.gcn_date}
              gst_no={formData.c.cust_gst_id}
              // gcn_no={0}
              // gcn_date={0}
            />
            <TransportationMode
              po_no={formData.odc1.po_no}
              po_date={formData.odc1.po_date}
              gcn_date={formData.odc1.gcn_date}
            />
          </div>
          <div className="column">
            <ReceiverDetails
              name={formData.r.cust_name}
              address={formData.r.cust_addr1}
              state={formData.r.cust_st_name}
              code={formData.r.cust_st_code}
              gst_no={formData.r.cust_gst_id}
            />
            <ConsigneeDetails
              name={formData.c.cust_name}
              address={formData.c.cust_addr1}
              state={formData.c.cust_st_name}
              code={formData.c.cust_st_code}
              gst_no={formData.c.cust_gst_id}
            />
          </div>
          <POTable
            po_data={formData.odc}
            gr={formData.gr}
            total_qty={formData.total_qty}
            total_taxable_value={formData.total_taxable_value}
            total_cgst={formData.total_cgst}
            total_sgst={formData.total_sgst}
            total_igst={formData.total_igst}
          />
          <InvoiceValue amount={formData.amount} gt={formData.gt} />
          <Toc />
          <div className="footer">
            <h5>MATCON/FORMS/021/00</h5>
          </div>
        </div>
      ) : (
        <h1>Error</h1>
      )}
    </>
  )
}
