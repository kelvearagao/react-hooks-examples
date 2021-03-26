import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import moment from "moment"

// http://unix:/var/run/docker.sock:/images/json

const formatSize = size => {
  let res = size / 1000 / 1000
  let unit = "kB"

  if (res > 1) {
    unit = res > 1000 ? "GB" : "MB"
  } else {
    res = size / 1000
  }

  return res.toFixed(2) + unit
}

export default () => {
  const [images, setImages] = useState([])
  const [flag, setFlag] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")

  //console.log(images.data.test)

  useEffect(() => {
    axios({
      url: "/dockerApi/v1.24/images/json"
    })
      .then(response => {
        console.log(response.data)
        setImages(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [selectedImage])

  function removeImage(id) {
    axios({
      method: "DELETE",
      url: "/dockerApi/v1.24/images/" + id + "?force=1"
    })
      .then(response => {
        setSelectedImage(id)
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container>
      {flag && "Car"}
      <h1>Docker</h1>
      <h2>Images</h2>
      <button onClick={() => setFlag(!flag)}>Switch</button>
      <Table size="sm" hover>
        <thead>
          <tr>
            <th>REPOSITORY</th>
            <th>TAG</th>
            <th>IMAGE ID</th>
            <th>CREATED</th>
            <th>SIZE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {images.map(item => (
            <tr key={item.Id}>
              <td>{item.RepoTags[0].split(":")[0]}</td>
              <td>
                {item.RepoTags[0].split(":")[1]}-<spam>Car</spam>
              </td>
              <td>{item.Id.substring(7, 19)}</td>
              <td>{moment.unix(item.Created).fromNow()}</td>
              <td>{formatSize(item.Size)}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => removeImage(item.Id)}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
