import React, { useState, useEffect, useMemo, useRef } from "react"
import "./styles.css"
import axios from "axios"

const SecurityList = ({ items, tableMode }) => {
  return tableMode ? (
    <table className="table" border="1">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor mínimo</th>
          <th>Tipo</th>
        </tr>
      </thead>
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
    <ol>
      {items.map(item => (
        <li key={item.securityId}>
          {item.issuerName}, R$ {item.minTick}
        </li>
      ))}
    </ol>
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
    <div className="content">
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

        <label>
          Modo tabela
          <input
            type="checkbox"
            value={filter}
            onChange={e => setTableMode(e.target.checked)}
          />
        </label>

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
