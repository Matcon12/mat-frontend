export default function InvoiceValue({ amount, gt }) {
  return (
    <table className="invoice-value">
      <tbody>
        <tr>
          <td>
            <div>
              <p>INVOICE VALUE (in Words)</p>
              <strong>{amount}</strong>
            </div>
          </td>
          <td>Total: {gt}</td>
        </tr>
      </tbody>
    </table>
  )
}
