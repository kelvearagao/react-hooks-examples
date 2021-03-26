/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
import React, { useRef, useEffect, useState } from "react"
import Chess from "chess.js"
/* eslint import/no-webpack-loader-syntax: off */
//import StockfishWorker from "worker-loader!stockfish/src/stockfish.asm.js"
//import StockfishWorker from "worker-loader!./stockfish6.js"
import StockfishWorker from './fish.worker.js'
import { Chessground } from "chessground"
import "./chessground.css"
import "./theme.css"
import { LEVELS, saveGame, deleteGame } from "./utils"
import PgnPanel from "./components/PgnPanel"
import { Panel, Select, Button, ButtonsWrapper, Wrapper, Header } from './styles'

const LEVEL_VALUE = 0
const defaulFen = "8/P7/8/8/8/8/7k/4K3 w - - 1 45"

const time = { wtime: 300000, btime: 300000, winc: 2000, binc: 2000 }
const playerColor = "white"
//const game = new Chess(defaulFen)
let game = new Chess()
//game.load(defaulFen)

//const stockfish = new StockfishWorker()
const stockfish = new Worker('/stockfish6.js')

function uciCmd(cmd) {
  console.log(`$  ${cmd}`)
  stockfish.postMessage(cmd)
}

function setLevel(level) {
  uciCmd(`setoption name Skill Level value ${level}`)
}

stockfish.onmessage = function onmessage(event) {
  console.log(`!--> ${event.data}`)
  const line = event.data
  if (line === 14 || line.includes("option name")) {
    //console.log("14 return")
    return
  }

  if (line === "uciok") {
    setLevel(LEVELS[LEVEL_VALUE].level)

    if (window.cg) {
      window.cg.set({ movable: { dests: getLegalMoves().moves } })
    }
    //window.cg.set({ movable: { dests: { a7: ["a8=Q"] } } })

    uciCmd(`setoption name Skill Level Maximum Error value ${LEVELS[LEVEL_VALUE].maximumError}`)
    uciCmd(`setoption name Skill Level Probability value ${LEVELS[LEVEL_VALUE].maximumError}`)

    return
  }

  if (line !== "uciok" && line !== "readyok") {
    const match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/)
    // IA faz o movimento
    if (match) {
      //game.move({ from: match[1], to: match[2], promotion: match[3] })
      window.cg.move(match[1], match[2])
    }

    //else if ((match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))) {
    //engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
    //}

    /// Is it sending feed back with a score?
    // if(match = line.match(/^info .*\bscore (\w+) (-?\d+)/)) {
    //     var score = parseInt(match[2]) * (game.turn() == 'w' ? 1 : -1);
    //     /// Is it measuring in centipawns?
    //     if(match[1] == 'cp') {
    //         engineStatus.score = (score / 100.0).toFixed(2);
    //     /// Did it find a mate?
    //     } else if(match[1] == 'mate') {
    //         engineStatus.score = 'Mate in ' + Math.abs(score);
    //     }

    //     /// Is the score bounded?
    //     if(match = line.match(/\b(upper|lower)bound\b/)) {
    //         engineStatus.score = ((match[1] == 'upper') == (game.turn() == 'w') ? '<= ' : '>= ') + engineStatus.score
    //     }
    // }
  }
}

uciCmd("uci")
//uciCmd("ucinewgame")
//uciCmd("position fen " + defaulFen)
//uciCmd("d")

//uciCmd("isready")
//setLevel(0)

function get_moves() {
  var moves = ""
  var history = game.history({ verbose: true })

  for (var i = 0; i < history.length; ++i) {
    var move = history[i]
    moves += " " + move.from + move.to + (move.promotion ? move.promotion : "")
  }

  return moves
}

function prepareMove() {
  uciCmd(`position startpos moves ${get_moves()}`)
  // uciCmd("position fen " + game.fen())
  const turn = game.turn() === 'w' ? 'white' : 'black'

  if (!game.game_over()) {
    if (turn !== playerColor) {
      // Skill Level Maximum Error
      // uciCmd("go depth 3 wtime 144000 btime 90000") // se for zero a engine faz merda
      uciCmd(`go depth ${LEVELS[LEVEL_VALUE].depth} wtime ${LEVELS[LEVEL_VALUE].wtime} btime ${LEVELS[LEVEL_VALUE].btime}`)
    }
  }
}

function getLegalMoves() {
  const moves = game.moves({ verbose: true })
  const res = moves.reduce(
    (acc, item) => {
      if (!acc.moves[item.from]) {
        acc.moves[item.from] = []
      }

      acc.moves[item.from].push(item.to)
      acc.detail[item.from + item.to] = item

      return acc
    },
    {
      moves: {},
      detail: {}
    }
  )

  return res
}

export default () => {
  const [chessApp, setChessApp] = useState(() => JSON.parse(localStorage.getItem('chessApp') || '{}'))
  const [games, setGames] = useState([])
  const boardRef = useRef()
  const [selectedGame, setSelectedGame] = useState("")
  const [moveNumber, setMoveNumber] = useState(0)
  const [turn, setTurn] = useState("Brancas")
  const [pgn, setPgn] = useState("")
  const [lastZoom, setLastZoom] = useState(() => {
    return parseFloat(localStorage.getItem("lichess-dev.cge.zoom")) || 100
  })

  const resize = (el, width) => {
    const px = `${width}px`
    el.style.width = px
    el.style.height = px
    document.body.dispatchEvent(new Event("chessground.resize"))
  }

  useEffect(() => {
    window.cg = Chessground(boardRef.current, {
      //fen: defaulFen,
      orientation: "white",
      disableContextMenu: false,
      movable: {
        free: false,
        showDests: true,
        events: {
          //after: (...props) => console.log("after", props),
          //afterNewPiece: (...props) => console.log("afterNewPiece", props)
        }
      },
      animation: {
        enabled: true,
        duration: 500
      },
      premovable: {
        //enabled: true,
        //showDests: true
      },
      draggable: {
        enabled: false
      },
      highlight: {
        lastMove: true,
        check: true
      },
      events: {
        change: e => {
          console.log('move -->', game.turn())
          setTurn(game.turn() === 'w' ? 'Brancas' : 'Negras')
        },
        move: (orig, dest, capturedPiece, ...rest) => {
          // console.log(orig, dest, capturedPiece, rest)
          setPgn(game.pgn())
          const hasPromotion = (getLegalMoves().detail[orig + dest] || {})
            .promotion

          const move = game.move({
            from: orig,
            to: dest,
            promotion: hasPromotion ? "q" : null
          })

          if (hasPromotion) {
            alert("Promotion!!!")
            window.cg.set({ fen: game.fen() })
          }

          // console.log('!!! move -->', move)

          if (move !== null) {
            window.cg.set({ movable: { dests: getLegalMoves().moves } })

            if (!selectedGame) {
              prepareMove()
            }
          }
        }
      }
    })

    window.cg.set({ movable: { dests: getLegalMoves().moves } })
  }, [])

  const handleToggleOrientation = () => {
    window.cg.toggleOrientation()
  }

  const setZoom = zoom => {
    const el = boardRef.current

    if (el) {
      const px = `${(zoom / 100) * 320}px`
      el.style.width = px
      el.style.height = px
      document.body.dispatchEvent(new Event("chessground.resize"))
    }
  }

  const handleZoom = e => {
    const zoom = parseFloat(e.target.value)
    setLastZoom(zoom)
    localStorage.setItem("lichess-dev.cge.zoom", zoom.toString())
    setZoom(zoom)
  }

  const handleBack = () => {
    if (moveNumber === 0 && game.turn() === 'w') {
      return
    }
    const number = game.turn() === 'w' ? moveNumber - 1 : moveNumber
    setMoveNumber(number)
    game.undo()
    window.cg.set({ 
      fen: game.fen(), 
      lastMove: [],
      movable: { dests: getLegalMoves().moves }
    })
  }
  
  const handleNext = () => {
    console.log(game.turn())
    const number = game.turn() === 'w' ? moveNumber + 1 : moveNumber
    setMoveNumber(number)
    const moves = pgn.split(/\d\./)

    if (!moves[number]) {
      return
    }

    const turnMoves = moves[number].trim().split(' ')
    // let turnColor = null
    // let move = null

    if (game.turn() === 'w') {
      //turnColor = 'w'
      //move = turnMoves[0]
      game.move(turnMoves[0])
    } else {
      //turnColor = 'b'
      //move = turnMoves[1]
      game.move(turnMoves[1])
    }

    window.cg.set({ 
      fen: game.fen(), 
      lastMove: [],
      movable: { dests: getLegalMoves().moves }
    })


    // window.cg.set({ 
    //   fen: game.fen(), 
    //   lastMove: [],
    //   movable: { dests: getLegalMoves().moves }
    // })
  }

  const handleNewGame = () => {
    setMoveNumber(0)
    game.reset()
    window.cg.set({
      fen: game.fen(),
      lastMove: [],
      movable: { dests: getLegalMoves().moves }
    })
    // uciCmd("ucinewgame") // quando devemos usar?
    uciCmd('position startpos')
  }

  const handleInfo = () => {
    uciCmd("info string")
  }

  const handlePossibleMoves = () => {
    console.log("fen ", game.fen())
    uciCmd(JSON.stringify(game.moves({ verbose: true })))
    uciCmd("d")
    console.log("state", window.cg.state)
  }

  const handleSelectGame = event => { 
    const id = event.target.value
    setSelectedGame(id)
  }

  const handleSaveGame = () => {
    const name = window.prompt("Salvar como", "")
    const games = saveGame({ name, pgn: game.pgn() })
    setGames(games)
  }

  const handleDeleteGame = () => {
    const games = deleteGame(selectedGame)
    setGames(games)
  }

  useEffect(() => {
    game = new Chess()

    if (selectedGame) {
      const selected = games.filter(item => selectedGame === item.id)[0]
      setPgn(selected.pgn)
      handleNewGame()
    }
  }, [selectedGame])

  useEffect(() => {
    setGames(chessApp.games)
  }, [])

  return (
    <Wrapper>
      <Header>
        <h2>Chess</h2>
      </Header>

      <div className="merida blue kboard">
        <div id="chessground-examples cg-wrap" ref={boardRef}></div>
      </div>
      
      {/* <div>
        <button onClick={handleToggleOrientation}>Toggle orientation</button>
        <label>
          Zoom
          <input type="number" value={lastZoom} onChange={handleZoom} />
        </label>
      </div> */}
      <Panel>
        <label>
          Partida
          <Select onChange={handleSelectGame}>
            <option value=""> - Selecionar - </option>
            {
              (games||[]).map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </Select>
          { selectedGame && (
            <Button onClick={handleDeleteGame}>Remover</Button>
          )}
        </label>

        <ButtonsWrapper>
          {/* <p>
            Jogam as { turn }
          </p> */}

          <Button type="button" onClick={handleBack}>
            Voltar
          </Button>

          <Button type="button" onClick={handleNext}>
            Avançar
          </Button>

          <Button onClick={handleSaveGame}>Salvar</Button>

          <Button onClick={handleNewGame}>Novo jogo</Button>

          {/* <button onClick={handlePossibleMoves}>possible moves</button> */}
        </ButtonsWrapper>

        <PgnPanel pgn={pgn} moveNumber={moveNumber} />
      </Panel>
    </Wrapper>
  )
}
