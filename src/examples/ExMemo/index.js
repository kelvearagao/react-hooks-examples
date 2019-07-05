import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
import "./styles.css"
import axios from "axios"

const SecurityList = ({ items }) => {
  console.log("SecurityList")
  const [tableMode, setTableMode] = useState(false)

  return (
    <div>
      <label>
        Modo tabela
        <input type="checkbox" onChange={e => setTableMode(e.target.checked)} />
      </label>

      {tableMode ? (
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
      )}
    </div>
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
  console.log("filter data") ||
  data.filter(item => !filter || item.minTick <= filter)

const Filter = React.memo(({ handleFilterClick }) => {
  console.log("render filter")
  const inputRef = useInputFocus()
  const [minValue, setMinValue] = useState(1000)
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const handleSubimit = e => {
    e.preventDefault()
    handleFilterClick(minValue)
  }

  return (
    <form>
      <label>
        Valor mínimo
        <input
          ref={inputRef}
          type="number"
          value={minValue}
          onChange={e => setMinValue(e.target.value)}
        />
      </label>

      <label>
        Mais filtros
        <input
          type="checkbox"
          value={showMoreFilters}
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
      <br />
      <button onClick={handleSubimit}>Filtrar</button>
    </form>
  )
})

const Page = () => {
  const [filter, setFilter] = useState(1000)
  const [data, setData] = useState([])

  useEffect(() => {
    axios("securities.json").then(res => {
      setData(res.data.securities)
    })
  }, [])

  const handleFilterClick = useCallback(data => {
    setFilter(data)
  }, [])

  const filteredData = filterData(data, filter)
  const securityList = <SecurityList items={filteredData} />

  console.log("Render")

  return (
    <div className="content">
      <Filter handleFilterClick={handleFilterClick} />
      <br />
      <br />
      {securityList}
    </div>
  )
}

export default () => <Page />
