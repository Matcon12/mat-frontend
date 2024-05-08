export default function Input({ name, value, change }) {

  const handleChange = (e) => {
    change(prevChange => {
      return { ...prevChange, [e.target.name]: e.target.value }
    })
  }

  return (
    <div>
      <input type="text" required={true} name={name} value={value} onChange={handleChange} />
      <label alt="Enter the customer Id" placeholder={name}></label>
    </div>
  )
}