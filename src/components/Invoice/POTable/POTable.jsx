export default function POTable({
  po_data,
  gr,
  total_qty,
  total_taxable_value,
  total_cgst,
  total_sgst,
  total_igst,
}) {
  return (
    <table className="table-border">
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th style={{ width: "50%", textAlign: "center" }}>
            Description of Services
          </th>
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
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        {po_data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {data.prod_desc} [{data.additional_desc}]
              </td>
              <td>{data.po_sl_no}</td>
              <td>9988</td>
              <td>{data.qty_delivered}</td>
              <td>{data.uom}</td>
              <td>{data.unit_price}</td>
              <td>{data.qty_delivered * data.unit_price}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : gr.cgst_rate}</td>
              <td>{parseInt(total_cgst) == 0 ? "" : data.cgst_price}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : gr.sgst_rate}</td>
              <td>{parseInt(total_sgst) == 0 ? "" : data.sgst_price}</td>
              <td>{parseInt(total_igst) == 0 ? "" : gr.igst_rate}</td>
              <td>{parseInt(total_igst) == 0 ? "" : data.igst_price}</td>
            </tr>
          )
        })}
        <tr>
          <td></td>
          <td></td>
          <td colSpan={2}>Total:</td>
          <td>{total_qty}</td>
          <td>Nos</td>
          <td></td>
          <td>{total_taxable_value}</td>
          <td></td>
          <td>{parseInt(total_cgst) == 0 ? "" : total_cgst}</td>
          <td></td>
          <td>{parseInt(total_sgst) == 0 ? "" : total_sgst}</td>
          <td></td>
          <td>{parseInt(total_igst) == 0 ? "" : total_igst}</td>
        </tr>
      </tbody>
    </table>
  )
}
