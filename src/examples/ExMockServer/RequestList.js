import React from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"

export default ({ requests, setRequestId, handleDelete }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th colSpan={3}>Requests</th>
      </tr>
    </thead>
    <tbody>
      {requests.map(req => (
        <tr key={req.id}>
          <td>{req.method}</td>
          <td>
            <a
              href="/"
              onClick={e => e.preventDefault() || setRequestId(req.id)}
            >
              {req.url}
            </a>
          </td>
          <td>
            <Button variant="danger" onClick={() => handleDelete(req.id)}>
              D
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)
