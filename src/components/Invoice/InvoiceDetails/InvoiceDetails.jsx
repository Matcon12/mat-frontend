export default function InvoiceDetails({ gcn_no, gcn_date, gst_no }) {
  return (
    <div>
      <h3 className="invoice-sub-heading">Invoice Details</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>GST No</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <b>29AAPFM1882M1ZG</b>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Reverse charge</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>N.A</td>
          </tr>
          <tr>
            <td>
              <strong>Invoice Number</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <b>{gcn_no}</b>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Invoice Date</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <b>{gcn_date}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
