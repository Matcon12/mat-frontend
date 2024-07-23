import { useEffect, useState } from "react"

export default function AutoCompleteComponent({
  data,
  mainData,
  setMainData,
  name,
  placeholder,
  search_value,
  filteredData,
  setFilteredData,
  setPoSlNo,
  index,
  array,
  required,
  readonly,
  onchange,
}) {
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    setFilteredData(data)
  }, [data, setFilteredData])

  const handleChange = async (event) => {
    setIsFocused(true)
    const { name, value } = event.target
    if (name == "poSlNo") {
      setMainData((prevEntries) => {
        const newEntries = [...prevEntries]
        newEntries[index] = {
          ...newEntries[index],
          [name]: value,
          hsnSac: findHsnCodeByPoSlNo(value),
        }
        return newEntries
      })
      setIsFocused(false)
    } else {
      setMainData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
      const filtered = data.filter((suggestion) => {
        // console.log("value: ", search_value)
        // console.log("suggestion", suggestion)
        return suggestion[search_value]
          .toLowerCase()
          .includes(value.toLowerCase())
      })
      setFilteredData(filtered)
      setPoSlNo(e.target)
      // console.log({ "data": data, "filtered data": filtered })
    }
  }

  const findHsnCodeByPoSlNo = (poSlNo) => {
    const item = data.find((item) => item.po_sl_no === poSlNo)
    return item ? item.hsnSac : null // Return hsn_code if found, otherwise null
  }

  const handleSuggestionClick = (suggestion) => {
    if (array) {
      setMainData((prevEntries) => {
        const newEntries = [...prevEntries]
        newEntries[index] = {
          ...newEntries[index],
          [name]: suggestion[search_value],
          hsnSac: findHsnCodeByPoSlNo(suggestion[search_value]),
        }
        setIsFocused(false)
        return newEntries
      })
    } else {
      setMainData((prevFormData) => ({
        ...prevFormData,
        [name]: suggestion[search_value],
      }))
      setFilteredData([])
    }
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
      {console.log(mainData)}
      <input
        type="text"
        placeholder=" "
        name={name}
        value={array ? mainData[index][name] : mainData[name]}
        onChange={(e) => handleChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        required={required}
        readOnly={readonly}
      />
      <label alt="" placeholder={placeholder}></label>
      {isFocused && filteredData && filteredData.length > 0 && (
        <ul id="autocomplete-list" className="suggestions-list">
          {filteredData.map((suggestion, i) => (
            <li key={i} onMouseDown={() => handleSuggestionClick(suggestion)}>
              {suggestion[search_value]}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
