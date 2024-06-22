export default function TransportationMode({ po_no, po_date, gcn_date }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h3>Transportation Mode</h3>
        <p className="transportation-mode">&nbsp;: Road</p>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>PO No.</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{po_no}</td>
          </tr>
          <tr>
            <td>
              <strong>PO Date</strong>
            </td>
            <td>&nbsp;:&nbsp; </td>
            <td>{po_date}</td>
          </tr>
          {/* <tr>
            <td>
              <strong>Inward DC No.</strong>
            </td>
            <td>&nbsp;:&nbsp; </td>
            <td>SC242500002</td>
          </tr> */}
          <tr>
            <td>
              <strong>Date of Supply</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <p>{gcn_date}</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Place of Supply</strong>
            </td>
            <td>&nbsp;:&nbsp; </td>
            <td>Ex-works, Bangalore</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
