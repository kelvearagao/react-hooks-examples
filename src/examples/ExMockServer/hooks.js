import { useState } from "react"

export const useMergeState = obj => {
  const [state, setState] = useState(obj)

  function mergeState(newState) {
    setState(prev => ({
      ...prev,
      ...newState
    }))
  }

  return [state, mergeState]
}
