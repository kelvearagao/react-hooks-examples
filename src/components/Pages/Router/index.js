import React, { useState } from "react"
import { Link, BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const OpenedCardModal = ({ history, match, location }) => {
  console.log("oc", match, history, location)
  return (
    <Modal show onHide={() => history.replace(match.url)}>
      <Modal.Header closeButton>
        <Modal.Title>Card Aberto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => history.push("/analise")}>
          Analise
        </Button>
        <Button variant="primary" onClick={() => history.push("/comprar")}>
          Comprar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Suitability = ({ history }) => {
  return (
    <Modal show onHide={() => history.goBack()}>
      <Modal.Header closeButton>
        <Modal.Title>Suitability</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>
    </Modal>
  )
}

const AnaliseModal = ({ history }) => {
  return (
    <Modal show onHide={() => history.goBack()}>
      <Modal.Header closeButton>
        <Modal.Title>Analise</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>
    </Modal>
  )
}

const CarteiraPage = ({ history, match }) => {
  //console.log("-->", match)
  return (
    <>
      <h1>Carteiras</h1>
      <Button
        variant="secondary"
        onClick={() => history.push(match.url + "/PETR4")}
      >
        Abrir Card
      </Button>
    </>
  )
}

const CardAbertoFlow = ({ history, match, location, ...rest }) => {
  const basename = "/" + match.params.page + "/" + match.params.code
  //console.log("flow", history, match, location, rest)

  return (
    <div>
      <h1>Workflow</h1>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/" component={OpenedCardModal} />
          <Route exact path="/analise" component={AnaliseModal} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default ({ match }) => {
  return (
    <>
      <ul>
        <li>Carteiras</li>
        <li>Pedidos</li>
        <li>Favoritos</li>
      </ul>

      <BrowserRouter basename={"/router"}>
        <Route path="/carteiras" render={CarteiraPage} />

        <Switch>
          <Route path="/:page/:code/comprar" render={Suitability} />
          <Route path="/:page/:code" render={CardAbertoFlow} />
          {/* <Redirect to="/carteiras" /> */}
        </Switch>
      </BrowserRouter>
    </>
  )
}
