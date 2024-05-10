import './Invoice.css'
import InvoiceDetails from '../../components/Invoice/InvoiceDetails/InvoiceDetails'
import TransportationMode from '../../components/Invoice/TransportationMode/TransportationMode'
import ReceiverDetails from '../../components/Invoice/ReceiverDetails/ReceiverDetails'
import ConsigneeDetails from '../../components/Invoice/ConsigneeDetails/ConsigneeDetails'
import POTable from '../../components/Invoice/POTable/POTable'
import InvoiceValue from '../../components/Invoice/InvoiceValue/InvoiceValue'
import Toc from '../../components/Invoice/Toc/Toc'

export default function Invoice() {
  return (
    <div className="invoice-container">
      <h4>TAX INVOICE</h4>
      <div className='column'>
        <InvoiceDetails />
        <TransportationMode />
      </div>
      <div className='column'>
        <ReceiverDetails />
        <ConsigneeDetails />
      </div>
      <POTable />
      <InvoiceValue />
      <Toc />
      <div className='footer'>
        <h5>MATCON/FORMS/021/00</h5>
      </div>
    </div>
  )
}