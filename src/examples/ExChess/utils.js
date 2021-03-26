/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
import { v4 as uuid } from 'uuid'

export const games = [
  {
    id: 1,
    name: 'Partida 1',
    pgn: '1. e4 d5 2. e5 Nc6 3. d4 e6 4. Bb5 Qh4 5. Nf3 Qg4 6. O-O a6 7. h3 Qg6 8. Bxc6+ bxc6 9. c4 dxc4 10. Nc3 Ne7 11. Qe2 a5 12. Na4 Ba6 13. Qe3 c3 14. Re1 Nd5 15. Qe4 Qxe4 16. Rxe4 c2 17. Nc5 Bxc5 18. dxc5 Bd3 19. Rd4 Be2 20. Bd2 Bxf3 21. gxf3 Ke7 22. Rc1 Nb4 23. a3 Nd5 24. Rxc2 Rhb8 25. Ra4 Rb3 26. Rxa5 Rxa5 27. Bxa5 Rxf3 28. Kg2 Rb3 29. a4 Kd7 30. Bd2 Nb4 31. Bxb4 Rxb4 32. a5 Ra4 33. b4 Rxb4 34. Ra2 Rb5 35. a6 Rxc5 36. a7 Rxe5 37. a8=Q Rg5+ 38. Kf3 c5 39. Rd2+ Rd5 40. Qa4+ Ke7 41. Qh4+ g5 42. Qh6 Rf5+ 43. Kg3 Rd5 44. Ra2 Rd3+ 45. f3 Rd5 46. Ra7 Kd7 47. Qxh7 Rf5 48. Qg8 Kc6 49. Qe8+ Kd6 50. Ra6+ Ke5 51. Qb5 Kf6 52. Qd7 Kg6 53. Qxc7 Rd5 54. Ra7 Rf5 55. Qd6 Rd5 56. Qf8 f6 57. Rg7+ Kf5 58. Rf7 Rd1 59. Rxf6+ Ke5 60. Kg4 Rg1+ 61. Kh5 Rg2 62. Kg6 Kd5 63. Kf7 Rg3 64. Qd8+ Kc4 65. Kxe6 Rxh3 66. Qd5+ Kb4 67. Qb7+ Ka5 68. Kd5 Rh6 69. Rxh6 c4',
    moves: 'e2e4 d7d5 e4e5 b8c6 d2d4 e7e6 f1b5 d8h4 g1f3 h4g4 e1g1 a7a6 h2h3 g4g6 b5c6 b7c6 c2c4 d5c4 b1c3 g8e7 d1e2 a6a5 c3a4 c8a6 e2e3 c4c3 f1e1 e7d5 e3e4 g6e4 e1e4 c3c2 a4c5 f8c5 d4c5 a6d3 e4d4 d3e2 c1d2 e2f3 g2f3 e8e7 a1c1 d5b4 a2a3 b4d5 c1c2 h8b8 d4a4 b8b3 a4a5 a8a5 d2a5 b3f3 g1g2 f3b3 a3a4 e7d7 a5d2 d5b4 d2b4 b3b4 a4a5 b4a4 b2b4 a4b4 c2a2 b4b5 a5a6 b5c5 a6a7 c5e5 a7a8q e5g5 g2f3 c6c5 a2d2 g5d5 a8a4 d7e7 a4h4 g7g5 h4h6 d5f5 f3g3 f5d5 d2a2 d5d3 f2f3 d3d5 a2a7 e7d7 h6h7 d5f5 h7g8 d7c6 g8e8 c6d6 a7a6 d6e5 e8b5 e5f6 b5d7 f6g6 d7c7 f5d5 a6a7 d5f5 c7d6 f5d5 d6f8 f7f6 a7g7 g6f5 g7f7 d5d1 f7f6 f5e5 g3g4 d1g1 g4h5 g1g2 h5g6 e5d5 g6f7 g2g3 f8d8 d5c4 f7e6 g3h3 d8d5 c4b4 d5b7 b4a5 e6d5 h3h6 f6h6 c5c4 h6a6'
  }
]

export const LEVELS = {
  0: {
    level: 0,
    maximumError: 5,
    probability: 1,
    depth: 1,
    wtime: 144000,
    btime: 72000
  }
}

export const getChessApp = () => {
  return JSON.parse(localStorage.getItem("chessApp") || '{}')
}

export const setChessApp = chessApp => {
  localStorage.setItem("chessApp", JSON.stringify(chessApp))
}

export const saveGame = game => {
  const chessApp = getChessApp()

  if (!chessApp.games) {
    chessApp.games = []
  }

  chessApp.games.push({
    id: uuid(),
    ...game
  })

  setChessApp(chessApp)

  return chessApp.games
}

export const deleteGame = id => {
  const chessApp =  getChessApp()
  const games = chessApp.games.filter(item => item.id !== id)
  chessApp.games = games

  setChessApp(chessApp)

  return chessApp.games
}