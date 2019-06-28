import React, { useState, useEffect, useMemo, useRef } from "react"
import axios from "axios"

const SecurityList = ({ items, tableMode }) => {
  return tableMode ? (
    <table border="1">
      <tbody>
        {items.map(item => (
          <tr key={item.securityId}>
            <td>{item.issuerName}</td>
            <td>R$ {item.minTick}</td>
            <td>{item.securityType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <ul>
      {items.map(item => (
        <li key={item.securityId}>
          {item.issuerName}, R$ {item.minTick}
        </li>
      ))}
    </ul>
  )
}

const useInputFocus = () => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return inputRef
}

const filterData = (data, filter) =>
  console.log("Filtering....") ||
  data.filter(item => !filter || item.minTick <= filter)

const Page = () => {
  const inputRef = useInputFocus()

  const [filter, setFilter] = useState("")
  const [data, setData] = useState([])
  const [tableMode, setTableMode] = useState(false)
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  useEffect(() => {
    axios("securities.json").then(res => {
      setData(res.data.securities)
    })
  }, [])

  const filteredData = useMemo(() => {
    return filterData(data, filter)
  }, [data, filter])

  const securityList = useMemo(() => {
    return <SecurityList items={filteredData} tableMode={tableMode} />
  }, [filteredData, tableMode])

  return (
    <div>
      <form>
        <label>
          Valor mínimo
          <input
            ref={inputRef}
            type="number"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </label>

        <br />

        <label>
          Modo tabela
          <input
            type="checkbox"
            value={filter}
            onChange={e => setTableMode(e.target.checked)}
          />
        </label>

        <br />
        <br />

        <label>
          Mais filtros
          <input
            type="checkbox"
            value={filter}
            onChange={e => setShowMoreFilters(e.target.checked)}
          />
        </label>

        {showMoreFilters && (
          <div>
            <select>
              <option>Selecionar Tipo</option>
            </select>
          </div>
        )}
      </form>

      <br />
      <br />

      {securityList}
    </div>
  )
}

export default () => <Page />
