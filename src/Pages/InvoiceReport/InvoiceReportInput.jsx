import { DatePicker, Space } from "antd"
import { useState } from "react"
import dayjs from "dayjs"
import "./InvoiceReportInput.css"
import api from "../../api/api"
import * as XLSX from "xlsx"

export default function InvoiceReportInput() {
  const initialFormData = {
    startDate: "",
    endDate: "",
  }

  const [formData, setFormData] = useState(initialFormData)

  const onStartDateChange = (date, dateString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: dateString,
    }))
  }
  const onEndDateChange = (date, dateString) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      endDate: dateString,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api
      .post("/invoiceReport", {
        startDate: formData.startDate,
        endDate: formData.endDate,
      })
      .then((response) => {
        if (response.status === 200) {
          // Access data from the response
          // const responseData = postReq.data.data;
          const responseData = response.data

          if (responseData) {
            // Your logic to handle the data on the frontend
            console.log("Received data:", responseData)
            const ws = XLSX.utils.json_to_sheet(responseData)

            const htmlString = XLSX.write(
              { Sheets: { Sheet1: ws }, SheetNames: ["Sheet1"] },
              { bookType: "html", bookSST: true, type: "binary" }
            )

            // Include Bootstrap CDN link for table styling
            const bootstrapLink =
              '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">'

            // Add buttons, Bootstrap link, and styles to the HTML content
            const htmlWithStyles = `
          <html>
            <head>
              ${bootstrapLink}
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                h2 {
                  color: #333;
                  border-bottom: 2px solid #ccc;
                  padding-bottom: 10px;
                  font-size: 1.5em;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                  font-size: 0.9em;
                  white-space: nowrap; 
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                th {
                  background-color: #f2f2f2;
                }
                button {
                  background-color: #4caf50;
                  color: white;
                  padding: 10px 15px;
                  margin: 10px;
                  cursor: pointer;
                  border: none;
                  border-radius: 5px;
                }
                button.close {
                  background-color: #d9534f; /* Custom color for close button */
                  margin-left: 10px; /* Add some margin to separate it from the download button */
                }
                button:hover {
                  background-color: #45a049;
                }
              </style>
            </head>
            <body>
              <h2>Invoice Report</h2>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      ${Object.keys(responseData[0])
                        .map((header) => `<th>${header}</th>`)
                        .join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${responseData
                      .map(
                        (row) =>
                          `<tr>${Object.values(row)
                            .map((value) => `<td>${value}</td>`)
                            .join("")}</tr>`
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
              <button onclick="closeWindow()">Close</button>
              <button onclick="downloadExcel()">Download Excel</button>
            </body>
          </html>
        `

            // Call the function to open the new window and provide download options
            downloadInvoiceReport(htmlString, htmlWithStyles)
          }
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const downloadInvoiceReport = (htmlString, htmlWithStyles) => {
    // Create a Blob containing the HTML data
    const blob = new Blob([htmlWithStyles], { type: "text/html" })

    // Create a new object URL
    const url = URL.createObjectURL(blob)

    // Open the URL in a new window
    const newWindow = window.open(url, "_blank")

    // Define functions on the new window
    newWindow.closeWindow = function () {
      newWindow.close()
    }

    newWindow.downloadExcel = function () {
      try {
        // Convert HTML content to Excel file and trigger download
        const wb = XLSX.read(htmlString, { type: "binary" })
        XLSX.writeFile(wb, "invoiceReports.xlsx")
      } catch (error) {
        console.error("Error downloading Excel file", error)
      }
    }
  }

  return (
    <div className="invoice-report-container">
      <div className="input-details-container">
        <h3>Invoice Report</h3>
        <form onSubmit={handleSubmit} className="input-details-form">
          <div className="datePickerContainers">
            <Space direction="vertical">
              <DatePicker
                onChange={onStartDateChange}
                name="startDate"
                value={
                  formData.startDate
                    ? dayjs(formData.startDate, "DD-MM-YYYY")
                    : ""
                }
                format="DD-MM-YYYY"
                placeholder={"Start Date"}
              />
              {formData.startDate && (
                <label className="poLabel">Start Date:</label>
              )}
            </Space>
          </div>
          <div className="datePickerContainers">
            <Space direction="vertical">
              <DatePicker
                onChange={onEndDateChange}
                name="endDate"
                value={
                  formData.endDate ? dayjs(formData.endDate, "DD-MM-YYYY") : ""
                }
                format="DD-MM-YYYY"
                placeholder={"End Date"}
              />
              {formData.endDate && <label className="poLabel">End Date:</label>}
            </Space>
          </div>
          <button type="submit">Get Invoice Report</button>
        </form>
      </div>
    </div>
  )
}
