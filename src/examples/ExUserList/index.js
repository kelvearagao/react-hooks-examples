import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import { EXCHANGES, TYPES } from "./constants"
import Modal from "../../components/Modal/Modal"
import Pagination from "components/Pagination"

const Page = styled.div``
const Table = styled.table`
    border-collapse:collapse
    background-color: #ffffff;
    width: 100%;

    tr {
        border-bottom: 2px solid rgb(209, 211, 212);
    }

    tr td, tr th {
        padding: 8px;
    }

    tr td {
        color: rgba(0, 0, 0, 0.6);
        font-size: 15px;
        font-weight: normal;
        height: 20px;
        letter-spacing: 0.25px;
        line-height: 20px;
    }

    tr th {
        color: rgb(0, 40, 70);
        font-size: 15px;
        font-weight: bold;
        height: 24px;
        letter-spacing: 0.1px;
        line-height: 24px;
        text-transform: uppercase;
    }
`

const UserTable = ({ stocks }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>symbol</th>
          <th>name</th>
          <th>currency</th>
          <th>type</th>
          <th>region</th>
          <th>exchange</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map(stock => (
          <tr key={stock.iexId}>
            <td>{stock.symbol}</td>
            <td width="30%">{stock.name}</td>
            <td>{stock.currency}</td>
            <td>{stock.type}</td>
            <td>{stock.region}</td>
            <td>{stock.exchange}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const UserCardList = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li>{user.name}</li>
      ))}
    </ul>
  )
}

const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState("")
  const [exchange, setExchange] = useState("")
  const [page, setPage] = useState(0)

  const [stocks, setStocks] = useState([])

  const fetchStocks = useCallback(async () => {
    const res = await fetch(
      `https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_27d3e1b830894445a1f94b9a2e546ffe`
    )

    const data = await res.json()
    setStocks(data)
  }, [])

  useEffect(() => {
    fetchStocks()
  }, [fetchStocks])

  const filteredStocks = stocks
    .filter(item => !type || item.type === type.toLowerCase())
    .filter(item => !exchange || item.exchange === exchange)

  const filteredLenght = filteredStocks.length

  console.log("page ->", page)

  return (
    <Page>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <select onChange={e => setType(e.target.value)}>
        <option value="">All types</option>
        {Object.keys(TYPES).map(key => {
          return (
            <option value={key}>
              {key} - {TYPES[key]}
            </option>
          )
        })}
      </select>

      <select onChange={e => setExchange(e.target.value)}>
        <option value="">All Exchanges</option>
        {EXCHANGES.map(item => {
          return (
            <option value={item.exchange}>
              {item.exchange} - {item.description}
            </option>
          )
        })}
      </select>

      <h2>Result: {filteredStocks.length}</h2>

      <UserTable stocks={filteredStocks.slice(page * 10, page * 10 + 10)} />

      <Pagination
        length={filteredLenght}
        size={10}
        currentPage={page}
        handlePageChange={setPage}
      />

      {isModalOpen ? "aberto" : "fechado"}

      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
    </Page>
  )
}

export default UserPage
