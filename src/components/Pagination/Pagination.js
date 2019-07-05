import React from "react"
import { PaginationWrapper } from "./Pagination.style"

const Pagination = ({ length, size, handlePageChange, currentPage }) => {
  const items = []
  items.push(<li onClick={() => handlePageChange(currentPage - 1)}>{"<<"}</li>)

  const step = 3
  let pageBegin = currentPage > step + 1 ? currentPage - step : 0
  let pageEnd = currentPage > step + 1 ? currentPage + step + 1 : 3 * step

  if (pageBegin > 0) {
    items.push(<li onClick={() => handlePageChange(0)}>0</li>)
    items.push(<li>...</li>)
  }

  for (let i = pageBegin; i < length / size && i < pageEnd; i++) {
    items.push(
      <li
        style={{ backgroundColor: currentPage === i ? "yellow" : "" }}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </li>
    )
  }

  if (length > 5) {
    items.push(<li>...</li>)
    items.push(
      <li onClick={() => handlePageChange(parseInt(length / size))}>
        {parseInt(length / size)}
      </li>
    )
  }

  items.push(<li onClick={() => handlePageChange(currentPage + 1)}>{">>"}</li>)

  return <PaginationWrapper>{items}</PaginationWrapper>
}

export default Pagination
