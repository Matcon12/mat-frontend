import Navbar from "../../components/Navbar/Navbar"
import { Outlet } from "react-router-dom"
import "./CompletePage.css"
import Sidebar from "../../components/Sidebar/Sidebar.jsx"
import Customer from "../Form/CreatePO/Customer.jsx"
import ErrorPage from "../ErrorPage/error-page.jsx"

import { Routes, Route } from "react-router-dom"
import Invoice from "../Invoice/Invoice.jsx"
import CreatePO from "../Form/CreatePO/Customer.jsx"
import UpdatePO from "../Form/UpdatePO/UpdatePO.jsx"
import EditCustomerDetails from "../CustomerDetails/EditCustomerDetails.jsx"
import EditProductDetails from "../ProductDetails/EditProductDetails.jsx"
import AddCustomerDetails from "../CustomerDetails/AddCustomerDetails.jsx"
import AddProductDetails from "../ProductDetails/AddProductDetails.jsx"
import PrintInvoice from "../Invoice/PrintInvoice.jsx"

export default function CompletePage() {
  return (
    <div className="container">
      <Navbar />
      <div className="sidebar-and-content">
        <Sidebar />
        <Routes>
          <Route path="/" />
          <Route path="purchase_order" element={<CreatePO />} />
          <Route path="invoice_generation">
            <Route index element={<Invoice />} />
            <Route path="print_invoice" element={<PrintInvoice />} />
          </Route>
          <Route path="edit_customerPurchaseOrder" element={<UpdatePO />} />
          <Route path="add_customer_details" element={<AddCustomerDetails />} />
          <Route path="add_product_details" element={<AddProductDetails />} />
          <Route
            path="edit_customer_details"
            element={<EditCustomerDetails />}
          />
          <Route path="edit_product_details" element={<EditProductDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  )
}
