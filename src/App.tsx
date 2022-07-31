import React, { useEffect, useState } from 'react'

type GameDifficulty = 0 | 1 | 2

export function App() {
  const [game, setGame] = useState({
    id: undefined,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: undefined,
    mines: undefined,
  })

  const [difficulty, setDifficulty] = useState<GameDifficulty>(0)

  useEffect(function () {
    async function loadExistingGame() {
      const existingGameId = localStorage.getItem('game-id')
      const existingDifficulty = localStorage.getItem('game-difficulty')
      console.log(existingGameId)

      if (existingGameId && existingDifficulty) {
        const response = await fetch(
          `http://minesweeper-api.herokuapp.com/games/${existingGameId}`
        )

        if (response.ok) {
          const gameJson = await response.json()

          setGame(gameJson)
          setDifficulty(Number(existingDifficulty) as GameDifficulty)
        }
      }
    }
    loadExistingGame()
  }, [])

  async function handleNewGameButtonClick(newGameDifficulty: 0 | 1 | 2) {
    const gameOptions = { difficulty: newGameDifficulty }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(gameOptions),
    }

    const response = await fetch(url, fetchOptions)

    console.log(response)

    if (response.ok) {
      const newGameStateJSON = await response.json()

      setDifficulty(newGameDifficulty)
      setGame(newGameStateJSON)
      localStorage.setItem('game-id', newGameStateJSON.id)
      localStorage.setItem('game-difficulty', String(newGameDifficulty))
    }
  }

  async function handleCheckOrFlagCell(
    row: number,
    col: number,
    action: 'check' | 'flag'
  ) {
    const checkOptions = {
      id: game.id,
      row,
      col,
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/${action}`
    const fetchOptions = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(checkOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  function transformCellValue(value: string) {
    if (value === 'F') {
      return <i className="fa fa-flag" />
    }

    if (value === '_') {
      return ' '
    }

    if (value === '*') {
      return <i className="fa fa-bomb" />
    }

    return value
  }

  function transformCellClassName(value: string | number) {
    switch (value) {
      case 'F':
        return 'cell-flag'

      case '*':
        return 'cell-bomb'

      case '_':
        return 'cell-free'

      case ' ':
        return undefined

      default:
        return `cell-number cell-${value}`
    }
  }

  return (
    <main>
      <h1>Minesweeper</h1>
      <p>
        <strong>Instructions:</strong>Choose difficulty level and may the odds
        be ever in your favor!
      </p>

      <h2>
        <button onClick={() => handleNewGameButtonClick(0)}>
          New Easy Game
        </button>
        <button
          className="new-game"
          onClick={() => handleNewGameButtonClick(1)}
        >
          New Intermediate Game
        </button>
        <button onClick={() => handleNewGameButtonClick(2)}>
          New Difficult Game
        </button>
      </h2>

      <p>
        <h3>Number of Mines: {game.mines}</h3>
        <h3>Game # {game.id}</h3>
      </p>

      {/* --------------Cell block---------------- */}

      <section className={`difficulty-${difficulty}`}>
        {game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button
                className={transformCellClassName(square)}
                onClick={function (event) {
                  event.preventDefault()
                  handleCheckOrFlagCell(row, col, 'check')
                }}
                onContextMenu={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'flag')
                }}
                key={col}
              >
                {transformCellValue(square)}
              </button>
            )
          })
        })}
      </section>
    </main>
  )
}
