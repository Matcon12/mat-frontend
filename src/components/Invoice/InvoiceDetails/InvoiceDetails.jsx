export default function InvoiceDetails() {
  return (
    <div>
      <h3 className="invoice-sub-heading">Invoice Details</h3>
      <table>
        <tbody>
          <tr>
            <td><strong>GST No</strong></td>
            <td>:</td>
            <td><b>1234567890</b></td>
          </tr>
          <tr>
            <td><strong>Reverse charge</strong></td>
            <td>:</td>
            <td>N.A</td>
          </tr>
          <tr>
            <td><strong>Invoice Number</strong></td>
            <td>:</td>
            <td><b>014/2024-25</b></td>
          </tr>
          <tr>
            <td><strong>Invoice Date</strong></td>
            <td>:</td>
            <td><b>02-05-2024</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}