export default function POTable() {
  return (
    <table className="table-border">
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th>Description of Services</th>
          <th>PO Item Sl. No.</th>
          <th>SAC Code</th>
          <th>QTY</th>
          <th>UOM</th>
          <th>Rate</th>
          <th>Total</th>
          <th>CGST Rate(%)</th>
          <th>CGST Amount (Rs)</th>
          <th>SGST Rate (%)</th>
          <th>SGST Amount (Rs)</th>
          <th>IGST Rate (%)</th>
          <th>IGST Amount (Rs)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>Exterior painting of:</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>1</td>
          <td>LIFTING STOP RAL9005 MACHINED (A14 09M)</td>
          <td>4</td>
          <td>9988</td>
          <td>50</td>
          <td>Nos</td>
          <td>1690.00</td>
          <td>84500.00</td>
          <td>9</td>
          <td>7605.00</td>
          <td>9</td>
          <td>7605.00</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td colSpan={2}>Total:</td>
          <td>50</td>
          <td>Nos</td>
          <td></td>
          <td>84500.00</td>
          <td></td>
          <td>7605.00</td>
          <td></td>
          <td>7605.00</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>

    </table>
  )
}
