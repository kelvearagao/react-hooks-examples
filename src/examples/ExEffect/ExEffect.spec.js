import "@testing-library/react/cleanup-after-each"
import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { render, waitForElement, act } from "@testing-library/react"
import axios from "axios"
import Comp from "./index"

jest.mock("axios")

describe("ExEffect", () => {
  it("should list hits", async () => {
    axios.mockImplementationOnce(() => ({
      data: {
        hits: [
          {
            objectID: 1,
            author: "kelve",
            url: "http://kelve.com",
            title: "Kelve Aragão"
          }
        ]
      }
    }))

    const { getByText, debug } = render(<Comp />)
    await waitForElement(() => getByText("kelve"))
  })
})
