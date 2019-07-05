import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"

const BASE_URL = "http://localhost:3000/api-proxy"

export default () => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch(`${BASE_URL}/requests`).then(
        res => console.log(res) || res.json()
      )

      setRequests(res)
    }

    getRequests()
  }, [])

  const [requestId, setRequestId] = useState(null)
  const [requestDetail, setRequestDetail] = useState({})
  useEffect(() => {
    if (!requestId) {
      return
    }

    const getRequestById = async requestId => {
      const res = await fetch(`${BASE_URL}/requests/${requestId}`).then(
        res => console.log(res) || res.json()
      )

      setRequestDetail(res)
    }

    getRequestById(requestId)
  }, [requestId])

  return (
    <Container fluid>
      <h1>Mock Server</h1>
      <Row>
        <Col md={4}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Requests</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr>
                  <td>
                    <a
                      href="/"
                      onClick={e => e.preventDefault() || setRequestId(req.id)}
                    >
                      {req.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col>
          <Row className="mb-3">
            <Col md={2}>
              <Button variant="danger" block>
                DELETE
              </Button>{" "}
            </Col>
            <Col md={2}>
              <Button variant="primary" block>
                UPDATE
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                style={{ width: "100%", fontSize: 12, height: 500 }}
                value={JSON.stringify(requestDetail, undefined, 2)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
