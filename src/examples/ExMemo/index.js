import React, { useState, useEffect, useMemo } from "react"
import "./styles.css"
import axios from "axios"

const SecurityTable = ({ items }) => (
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
)

const SecurityList = ({ items }) => (
  <ol>
    {items.map(item => (
      <li key={item.securityId}>
        {item.issuerName}, R$ {item.minTick}
      </li>
    ))}
  </ol>
)

const filterData = (data, filter) =>
  console.log("filter data") ||
  data.filter(item => !filter || item.minTick <= filter)

const Page = () => {
  const [minValue, setMinValue] = useState(1000)
  const [tableMode, setTableMode] = useState(false)
  const [filter, setFilter] = useState({})
  const [data, setData] = useState([])

  useEffect(() => {
    axios("securities.json").then(res => {
      setData(res.data.securities)
    })
  }, [])

  const filteredData = useMemo(() => filterData(data, filter.minValue), [
    data,
    filter.minValue
  ])

  const handleSubimit = e => {
    e.preventDefault()

    setFilter({ minValue })
  }

  return (
    <div className="content">
      <form>
        <label>
          Valor mínimo
          <input
            type="number"
            value={minValue}
            onChange={e => setMinValue(e.target.value)}
          />
        </label>

        <button onClick={handleSubimit}>Filtrar</button>
      </form>

      <br />
      <br />
      <label>
        Modo tabela
        <input type="checkbox" onChange={e => setTableMode(e.target.checked)} />
      </label>

      {tableMode ? (
        <SecurityTable items={filteredData} />
      ) : (
        <SecurityList items={filteredData} />
      )}
    </div>
  )
}

export default () => <Page />
