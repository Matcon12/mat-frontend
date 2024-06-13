import "./ViewPrint.css"
import { Link } from "react-router-dom"

export default function Report() {
  return (
    <div className="report-container">
      <div className="button-container">
        <h3>Report</h3>
        <div className="report-buttons">
          <Link to="invoice-report" className="button2">
            Invoice
          </Link>
          <Link to="dc-report" className="button2">
            DC
          </Link>
        </div>
      </div>
    </div>
  )
}
