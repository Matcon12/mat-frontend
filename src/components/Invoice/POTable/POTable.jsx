export default function POTable({
  po_data,
  gr,
  total_qty,
  total_taxable_value,
  total_cgst,
  total_sgst,
  total_igst,
}) {
  const calculateTotal = (qty, price) => {
    const quantity = parseFloat(qty)
    const unitPrice = parseFloat(price)
    if (isNaN(quantity) || isNaN(unitPrice)) {
      return "Invalid data"
    }
    return (quantity * unitPrice).toFixed(2)
  }

  return (
    <table className="po-table">
      <thead>
        <tr>
          <th className="col1">Sl. No.</th>
          <th className="col2" style={{ textAlign: "center" }}>
            Description of Goods
          </th>
          <th className="col3">PO Sl. No.</th>
          <th className="col4">HSN Code</th>
          <th className="col5">QTY</th>
          <th className="col6">UOM</th>
          <th className="col7">Rate</th>
          <th className="col8">Total</th>
          <th className="col9">CGST Rate (%)</th>
          <th className="col10">CGST Amount (Rs)</th>
          <th className="col11">SGST Rate (%)</th>
          <th className="col12">SGST Amount (Rs)</th>
          <th className="col13">IGST Rate (%)</th>
          <th className="col14">IGST Amount (Rs)</th>
        </tr>
      </thead>
      <tbody>
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td className="col1">{index + 1}</td>
              <td className="col2">
                {data.prod_desc} [{data.additional_desc}, {data.omat}]
              </td>
              <td className="col3">{data.po_sl_no}</td>
              <td className="col4">{data.hsn}</td>
              <td className="col5">{data.qty_delivered}</td>
              <td className="col6">{data.uom}</td>
              <td className="col7">{data.unit_price}</td>
              <td className="col8">
                {calculateTotal(data.qty_delivered, data.unit_price)}
              </td>
              <td className="col9">
                {parseInt(total_cgst) === 0 ? "" : gr.cgst_rate}
              </td>
              <td className="col10">
                {parseInt(total_cgst) === 0 ? "" : data.cgst_price}
              </td>
              <td className="col11">
                {parseInt(total_sgst) === 0 ? "" : gr.sgst_rate}
              </td>
              <td className="col12">
                {parseInt(total_sgst) === 0 ? "" : data.sgst_price}
              </td>
              <td className="col13">
                {parseInt(total_igst) === 0 ? "" : gr.igst_rate}
              </td>
              <td className="col14">
                {parseInt(total_igst) === 0 ? "" : data.igst_price}
              </td>
            </tr>
          )
        })}
        <tr>
          <td className="col1"></td>
          <td className="col2"></td>
          <td className="col3" colSpan={2}>
            Total:
          </td>
          <td className="col5">{total_qty}</td>
          <td className="col6"></td>
          <td className="col7"></td>
          <td className="col8">{total_taxable_value}</td>
          <td className="col9"></td>
          <td className="col10">
            {parseInt(total_cgst) == 0 ? "" : total_cgst}
          </td>
          <td className="col11"></td>
          <td className="col12">
            {parseInt(total_sgst) == 0 ? "" : total_sgst}
          </td>
          <td className="col13"></td>
          <td className="col14">
            {parseInt(total_igst) == 0 ? "" : total_igst}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
