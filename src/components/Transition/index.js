import React, { useState, useEffect, useRef, useMemo } from "react"
import { Transition as TransitionR } from "react-transition-group"

const STATES = {
  ENTERING: "entering",
  ENTERED: "entered",
  EXITING: "exiting",
  EXITED: "exited"
}

const handleState = prevState => {
  let nextState = STATES.ENTERING

  if (prevState === STATES.ENTERING) {
    nextState = STATES.ENTERED
  }

  if (prevState === STATES.ENTERED) {
    nextState = STATES.EXITING
  }

  if (prevState === STATES.EXITING) {
    nextState = STATES.EXITED
  }

  if (prevState === STATES.EXITED) {
    nextState = STATES.ENTERING
  }

  console.log(prevState, "-->", nextState)

  return nextState
}

const useTransition = ({ timeout, inProp }) => {
  const ref = useRef()
  const isAppear = useRef(true)
  const [state, setState] = useState(null)

  useEffect(() => {
    setState(handleState)
    ref.current = setTimeout(() => {
      setState(handleState)
      isAppear.current = false
    }, timeout.appear)
  }, [])

  useEffect(() => {
    if (isAppear.current) {
    } else {
      setState(handleState)

      ref.current = setTimeout(
        () => {
          setState(handleState)
        },
        inProp ? timeout.enter : timeout.exit
      )
    }

    return () => {
      console.log("close")
      clearTimeout(ref.current)
    }
  }, [inProp])

  //console.log("render")

  //   useEffect(() => {
  //     ref.current = setTimeout(() => {
  //       setState(STATES.ENTERED)
  //     }, timeout.appear)
  //   }, [timeout.appear])

  //   useEffect(() => {
  //     if (inProp && state !== STATES.ENTERING) {
  //       if (ref.current) {
  //         clearTimeout(ref.current)
  //       }

  //       setState(STATES.ENTERING)
  //       ref.current = setTimeout(() => {
  //         setState(STATES.ENTERED)
  //       }, timeout.enter)
  //     }

  //     return function close() {
  //       if (ref.current) {
  //         clearTimeout(ref.current)
  //       }
  //       setState(STATES.EXITING)

  //       ref.current = setTimeout(() => {
  //         setState(STATES.EXITED)
  //       }, timeout.exit)
  //     }
  //   }, [inProp, timeout.enter, timeout.exit])

  return state
}

const Transition = ({ children, timeout, inProp }) => {
  const state = useTransition({ timeout, inProp })

  return <>{children(state)}</>
}

const transitionStyles = {
  entering: { color: "red", backgroundColor: "black" },
  entered: { color: "brown", backgroundColor: "gray", height: "200px" },
  exiting: { color: "blue" },
  exited: { color: "pink" }
}

const Fade = () => {
  const [show, setShow] = useState(true)
  const state = useTransition({
    timeout: {
      appear: 5000,
      enter: 3000,
      exit: 1000
    },
    inProp: show
  })

  return (
    <>
      <div
        style={{
          //...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        {state} I'm a fade Transition (Custom hook)!
      </div>

      <hr />

      {/* <Transition
        appear
        inProp={show}
        timeout={{
          appear: 5000,
          enter: 3000,
          exit: 1000
        }}
      >
        {state2 => (
          <div
            style={{
              //...defaultStyle,
              ...transitionStyles[state2]
            }}
          >
            {state2} I'm a fade Transition (Transition Comp using Hooks)!
          </div>
        )}
      </Transition> */}

      <hr />

      <TransitionR
        appear
        in={show}
        timeout={{
          appear: 5000,
          enter: 3000,
          exit: 1000
        }}
      >
        {state => (
          <div
            style={{
              //...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {state} I'm a fade Transition! (RTG)
          </div>
        )}
      </TransitionR>

      <button onClick={() => setShow(prev => !prev)}>Toggle</button>
    </>
  )
}

export default () => <Fade in />
