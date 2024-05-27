import ReactDOM from "react-dom/client"
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom"
import ErrorPage from "./Pages/ErrorPage/error-page.jsx"
import CompletePage from "./Pages/CompletePage/CompletePage.jsx"
import Invoice from "./Pages/Invoice/Invoice.jsx"

import CreatePO from "./Pages/Form/CreatePO/Customer.jsx"
import UpdatePO from "./Pages/Form/UpdatePO/UpdatePO.jsx"

import EditCustomerDetails from "./Pages/CustomerDetails/EditCustomerDetails.jsx"
import EditProductDetails from "./Pages/ProductDetails/EditProductDetails.jsx"
import AddCustomerDetails from "./Pages/CustomerDetails/AddCustomerDetails.jsx"
import AddProductDetails from "./Pages/ProductDetails/AddProductDetails.jsx"
import PrintInvoice from "./Pages/Invoice/PrintInvoice.jsx"

import App from "./App.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CompletePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/purchase_order",
        element: <CreatePO />,
      },
      {
        path: "/invoice_generation",
        element: <Invoice />,
      },
      {
        path: "/invoice_generation/print_invoice",
        element: <PrintInvoice />,
      },
      {
        path: "/edit_customerPurchaseOrder",
        element: <UpdatePO />,
      },
      {
        path: "/add_customer_details",
        element: <AddCustomerDetails />,
      },
      {
        path: "/add_product_details",
        element: <AddProductDetails />,
      },
      {
        path: "/edit_customer_details",
        element: <EditCustomerDetails />,
      },
      {
        path: "/edit_product_details",
        element: <EditProductDetails />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CompletePage />
  </BrowserRouter>
)
