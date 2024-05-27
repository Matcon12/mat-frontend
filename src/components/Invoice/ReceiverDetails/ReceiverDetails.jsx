export default function ReceiverDetails({
  name,
  address,
  state,
  code,
  gst_no,
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
            <td>:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>
              <strong>Address</strong>
            </td>
            <td>:</td>
            <td className="table-address">{address}</td>
          </tr>
          <tr>
            <td>
              <strong>State</strong>
            </td>
            <td>:</td>
            <td>{state}</td>
          </tr>
          <tr>
            <td>
              <strong>State Code</strong>
            </td>
            <td>:</td>
            <td>{code}</td>
          </tr>
          <tr>
            <td>
              <strong>GST No</strong>
            </td>
            <td>:</td>
            <td>
              <b>{gst_no}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
