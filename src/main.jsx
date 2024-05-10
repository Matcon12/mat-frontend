import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Pages/ErrorPage/error-page.jsx'
import CompletePage from './Pages/CompletePage/CompletePage.jsx';
import Invoice from './Pages/Invoice/Invoice.jsx'

import CreatePO from './Pages/Form/CreatePO/Customer.jsx'
import UpdatePO from './Pages/Form/UpdatePO/UpdatePO.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CompletePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/purchase_order',
        element: <CreatePO />
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
