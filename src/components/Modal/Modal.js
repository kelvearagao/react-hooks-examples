import React, { useEffect, useRef } from "react"
import styled from "styled-components"

/* The Modal (background) */
const ModalWrapper = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`

/* Modal Content */
const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`
/* The Close Button */
const Close = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  :hover,
  :focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`

const Modal = ({ isOpen, handleClose }) => {
  const modalRef = useRef()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleStatusChange(event) {
      console.log("change")
      if (event.target === modalRef.current) {
        modalRef.current.style.display = "none"
      }
    }

    document.addEventListener("click", handleStatusChange)
    modalRef.current.style.display = "block"

    return function cleanup() {
      console.log("cleanup")
      document.removeEventListener("clicK", handleStatusChange)
    }
  }, [isOpen])

  function handleCloseClick() {
    handleClose()
    modalRef.current.style.display = "none"
  }

  console.log("render modal")

  return (
    <ModalWrapper>
      <ModalContent ref={modalRef}>
        <Close onClick={handleClose}>&times;</Close>
        <p>Some text in the Modal..</p>
      </ModalContent>
    </ModalWrapper>
  )
}

export default Modal
