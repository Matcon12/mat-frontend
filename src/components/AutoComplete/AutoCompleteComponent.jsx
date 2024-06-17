import { useEffect, useState } from "react"

export default function AutoCompleteComponent({
  data,
  mainData,
  // setData,
  setMainData,
  // handleChange,
  name,
  placeholder,
  search_value,
  filteredData,
  setFilteredData
}) {

  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    setFilteredData(data);
  }, [data, setFilteredData]);

  const handleChange = async (event) => {
    const { name, value } = event.target
    setMainData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    const filtered = data.filter((suggestion) => {
      console.log("value: ", search_value)
      console.log("suggestion", suggestion)
      return suggestion[search_value].toLowerCase().includes(value.toLowerCase())
    })
    setFilteredData(filtered)
  }

  const handleSuggestionClick = (suggestion) => {
    setMainData((prevFormData) => ({
      ...prevFormData,
      [name]: suggestion[search_value],
    }))
    setFilteredData([])
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <>
      <input
        type="text"
        required={true}
        name={name}
        value={mainData[name]}
        onChange={(e) => handleChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
      />
      <label alt="Enter the Customer ID" placeholder={placeholder}></label>
      {isFocused && filteredData.length > 0 && (
        <ul id="autocomplete-list" className="suggestions-list">
          {filteredData.map((suggestion, i) => (
            <li
              key={i}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion[search_value]}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}