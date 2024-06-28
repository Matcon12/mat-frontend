export default function ReceiverDetails({
  name,
  address,
  state,
  code,
  gst_no,
  gst_exception,
}) {
  return (
    <div>
      <h3>Details of Receiver(Billed to)</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>
              <strong>Address</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td className="table-address">{address}</td>
          </tr>
          <tr>
            <td>
              <strong>State</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{state}</td>
          </tr>
          <tr>
            <td>
              <strong>State Code</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>{code}</td>
          </tr>
          {gst_exception && (
            <tr>
              <td>
                <strong>GST Exception</strong>
              </td>
              <td>&nbsp;:&nbsp;</td>
              <td>
                <b>{gst_exception}</b>
              </td>
            </tr>
          )}
          <tr>
            <td>
              <strong>GST No</strong>
            </td>
            <td>&nbsp;:&nbsp;</td>
            <td>
              <b>{gst_no}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
