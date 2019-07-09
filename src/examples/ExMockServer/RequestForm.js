import React, { useEffect, useState, useRef } from "react"
import { useMergeState } from "./hooks"
import Form from "react-bootstrap/Form"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const BASE_URL = "http://localhost:3000/api-proxy"

export default ({ setRequestDetail, handleSave, requestDetail }) => {
  const headerRef = useRef()
  const responseRef = useRef()

  useEffect(() => {
    headerRef.current.value =
      JSON.stringify(requestDetail.query, undefined, 2) || "{}"
    responseRef.current.value =
      JSON.stringify(requestDetail.response, undefined, 2) || "{}"
  }, [requestDetail.id])

  return (
    <>
      <Row className="mb-2">
        <Col md={2}>
          <b>Request Detail</b>
        </Col>
        <Col md={5}>
          <p>{requestDetail.id}</p>
        </Col>
        <Col md={{ span: 2, offset: 1 }}>
          <Button
            variant="secondary"
            block
            onClick={() => {
              //headerRef.current.value = ""
              //responseRef.current.value = ""
              setRequestDetail({
                id: "",
                url: "",
                method: "GET",
                status: 200,
                type: "default",
                query: undefined,
                response: undefined
              })
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col md={{ span: 2 }}>
          <Button
            variant="success"
            block
            onClick={() => {
              handleSave({
                ...requestDetail,
                query: JSON.parse(headerRef.current.value),
                response: JSON.parse(responseRef.current.value)
              })
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Label>Method</Form.Label>
          <Form.Control
            as="select"
            onChange={e =>
              setRequestDetail({
                method: e.target.value
              })
            }
            value={requestDetail.method}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </Form.Control>
        </Col>
        <Col md={6}>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={requestDetail.url}
            onChange={e =>
              setRequestDetail({
                url: e.target.value
              })
            }
          />
        </Col>
        <Col md={2}>
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            value={requestDetail.status}
            onChange={e =>
              setRequestDetail({
                status: e.target.value
              })
            }
          />
        </Col>
        <Col md={2}>
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            onChange={e =>
              setRequestDetail({
                type: e.target.value
              })
            }
            value={requestDetail.type}
          >
            <option value="default">Default</option>
            <option value="custom">Custom</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs defaultActiveKey="params" id="uncontrolled-tab-example">
            <Tab.Container eventKey="params" title="Params">
              <Row>
                <Col className="mt-3 mb-2">
                  <Form.Control
                    as="textarea"
                    style={{ width: "100%", fontSize: 12, height: 100 }}
                    ref={headerRef}
                  />
                </Col>
              </Row>
            </Tab.Container>
            <Tab.Container eventKey="header" title="Header">
              <Row>
                <Col className="mt-3 mb-2">
                  <Form.Control
                    as="textarea"
                    style={{ width: "100%", fontSize: 12, height: 100 }}
                    value={{}}
                  />
                </Col>
              </Row>
            </Tab.Container>
            <Tab.Container eventKey="body" title="Body">
              <Row>
                <Col className="mt-3 mb-2">
                  <Form.Control
                    as="textarea"
                    style={{ width: "100%", fontSize: 12, height: 100 }}
                    value={JSON.stringify(requestDetail.query, undefined, 2)}
                  />
                </Col>
              </Row>
            </Tab.Container>
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Response</Form.Label>
          <Form.Control
            as="textarea"
            ref={responseRef}
            style={{ width: "100%", fontSize: 12, height: 400 }}
          />
        </Col>
      </Row>
    </>
  )
}
