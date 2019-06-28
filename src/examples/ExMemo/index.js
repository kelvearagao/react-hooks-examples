import React, { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { tsAnyKeyword } from "@babel/types"

const SecurityList = ({ items, tableMode, darkMode }) => {
  console.log("Render SecurityList")
  return tableMode ? (
    <table border="1">
      <tbody>
        {items.map(item => (
          <tr key={item.securityId}>
            <td>{item.issuerName}</td>
            <td>R$ {item.minTick}</td>
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

const filterData = (data, filter) =>
  console.log("Filtering....") ||
  data.filter(item => !filter || item.minTick <= filter)

const Page = () => {
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
