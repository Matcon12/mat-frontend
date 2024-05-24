import "./Invoice.css"
import InvoiceDetails from "./InvoiceDetails/InvoiceDetails"
import TransportationMode from "./TransportationMode/TransportationMode"
import ReceiverDetails from "./ReceiverDetails/ReceiverDetails"
import ConsigneeDetails from "./ConsigneeDetails/ConsigneeDetails"
import POTable from "./POTable/POTable"
import InvoiceValue from "./InvoiceValue/InvoiceValue"
import Toc from "./Toc/Toc"

export default function Invoice() {
  return (
    <div className="invoice-container">
      <h4>TAX INVOICE</h4>
      <div className="column">
        <InvoiceDetails />
        <TransportationMode />
      </div>
      <div className="column">
        <ReceiverDetails />
        <ConsigneeDetails />
      </div>
      <POTable />
      <InvoiceValue />
      <Toc />
      <div className="footer">
        <h5>MATCON/FORMS/021/00</h5>
      </div>
    </div>
  )
}
