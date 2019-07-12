import React, { useState, useEffect } from "react"
import axios from "axios"
import "./style.css"

const SEARCH_URL = "http://hn.algolia.com/api/v1/search?query="

export default () => {
  const [data, setData] = useState({ hits: [] })
  const [query, setQuery] = useState("redux")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axios(SEARCH_URL + query)
        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [query])

  return (
    <div className="content">
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <br />
      <br />
      <br />

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <table class="table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {data.hits.map(item => (
              <tr key={item.objectID}>
                <td>{item.author}</td>
                <td href={item.url}>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
