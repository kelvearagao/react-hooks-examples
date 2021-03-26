/* eslint-disable semi */
import React from 'react'
import { Wrapper, Move } from './PgnPanel.style'

export default ({ moveNumber, pgn = '' }) => {
  const moves = pgn.split(/\d+\./)

  return (
    <Wrapper>
      { moves.map((move, index) => move && (
      <Move active={moveNumber === index} key={`${move}.`}>
        {`${index}. ${move}`}
      </Move>
      )) }
    </Wrapper>
  )
}
