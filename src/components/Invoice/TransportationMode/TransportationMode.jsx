export default function TransportationMode({ po_no, po_date }) {
  return (
    <div>
      <h3>Transportation Mode</h3>
      <p className="transportation-mode">: Road</p>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>PO No.</strong>
            </td>
            <td>:</td>
            <td>{po_no}</td>
          </tr>
          <tr>
            <td>
              <strong>PO Date</strong>
            </td>
            <td>:</td>
            <td>{po_date}</td>
          </tr>
          <tr>
            <td>
              <strong>Inward DC No.</strong>
            </td>
            <td>:</td>
            <td>SC242500002</td>
          </tr>
          <tr>
            <td>
              <strong>Date of Supply</strong>
            </td>
            <td>:</td>
            <td>02-05-2024</td>
          </tr>
          <tr>
            <td>
              <strong>Place of Supply</strong>
            </td>
            <td>:</td>
            <td>Ex-works, Bangalore</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
