import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react"
import { useMergeState } from "./hooks"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import RequestList from "./RequestList"
import RequestForm from "./RequestForm"

const BASE_URL = "http://localhost:3000/api-proxy"

const initialRequestDetailState = {
  id: undefined,
  url: "",
  method: "GET",
  status: 200,
  type: "default",
  response: undefined,
  query: undefined
}

export default () => {
  const [requests, setRequests] = useState([])
  const [deleteId, setDeleteId] = useState([])

  useEffect(() => {
    const getRequests = async () => {
      const res = await fetch(`${BASE_URL}/requests`).then(
        res => console.log(res) || res.json()
      )

      setRequests(res)
    }

    getRequests()
  }, [deleteId])

  const [requestId, setRequestId] = useState(null)

  const [requestDetail, setRequestDetail] = useMergeState(
    initialRequestDetailState
  )

  useEffect(() => {
    if (!requestId) {
      return
    }

    const getRequestById = async requestId => {
      const res = await fetch(`${BASE_URL}/requests/${requestId}`).then(res =>
        res.json()
      )

      setRequestDetail(res)
    }

    getRequestById(requestId)
  }, [requestId])

  function handleSave(data) {
    const saveRequest = async body => {
      await fetch(`${BASE_URL}/requests${body.id ? `/${body.id}` : ""}`, {
        method: body.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...body })
      }).then()

      setRequestDetail(initialRequestDetailState)
    }
    console.log(data)
    saveRequest(data)
  }

  function handleDelete(id) {
    const deleteRequest = async id => {
      const res = await fetch(`${BASE_URL}/requests/${id}`, {
        method: "DELETE"
      }).then()

      setDeleteId(id)
    }

    deleteRequest(id)
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <h1>Mock Server</h1>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <RequestList
            requests={requests}
            setRequestId={setRequestId}
            handleDelete={handleDelete}
          />
        </Col>

        <Col>
          <RequestForm
            requestDetail={requestDetail}
            setRequestDetail={setRequestDetail}
            handleSave={handleSave}
          />
        </Col>
      </Row>
    </Container>
  )
}
