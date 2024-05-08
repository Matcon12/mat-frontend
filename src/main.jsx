import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage/error-page.jsx'
import Customer from './components/Form/CreatePO/Customer.jsx'
import CompletePage from './Pages/CompletePage/CompletePage.jsx';
import Invoice from './components/Invoice/Invoice.jsx'
import UpdatePO from './components/Form/UpdatePO/UpdatePO.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CompletePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/purchase_order',
        element: <Customer />
      },
      {
        path: '/invoice_generation',
        element: <Invoice />
      },
      {
        path: '/edit_customerPurchaseOrder',
        element: <UpdatePO />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
