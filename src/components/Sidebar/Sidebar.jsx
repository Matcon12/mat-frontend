import "./Sidebar.css"
import { Link } from "react-router-dom"
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"

export default function SidebarComponent() {
  return (
    // <div className="sidebar-container">
    //   <ul>
    //     <li>
    //       <Link to="/purchase_order">Purchase Order</Link>
    //     </li>
    //     <li>
    //       <Link to="/invoice_generation">Invoice Generation</Link>
    //     </li>
    //     <li>
    //       <Link to="/add_customer_details">Customer Details</Link>
    //     </li>
    //     <li>
    //       <Link to="/add_product_details">Product Details</Link>
    //     </li>
    //     <li>
    //       <Link to="/report">Report</Link>
    //     </li>
    //   </ul>
    // </div>

    <Sidebar rootStyles={{ backgroundColor: "#beddf9" }}>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "red",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem component={<Link to="/purchase_order" />}>
          Purchase Order
        </MenuItem>
        <MenuItem component={<Link to="/invoice_generation" />}>
          Invoice Generation
        </MenuItem>
        <MenuItem component={<Link to="/add_customer_details" />}>
          Customer Details
        </MenuItem>
        <MenuItem component={<Link to="/add_product_details" />}>
          Product Details
        </MenuItem>
        <SubMenu label="Reports/challan">
          <MenuItem component={<Link to="/report" />}>View/Print</MenuItem>
          <MenuItem component={<Link to="/invoice-report" />}>Report</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  )
}
