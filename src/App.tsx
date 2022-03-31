import React, { useState } from 'react'

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

async function handleClickCell(row: number, column: number) {
  // Generate the URL we need
  const url = `https://minesweeper-api.herokuapp.com/`
  // Make an object to send as JSON
  const body = { row: row, column: column }
  // Make a POST request to make a move
  const response = await fetch(url, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
  })
  if (response.ok) {
  // Get the response as JSON
  const newGameState = await response.json()
  // Make that the new state!
  setGame(newGameState)
  }
  }

export function App() {
  return (
    <div>
      <h1>Minesweeper</h1>
      <p>
        <strong>Instructions:</strong>Choose difficulty level and may the odds
        be ever in your favor!
      </p>

      <label>Difficulty:</label>

      <select name="difficulty" id="difficulty">
        <option value="">--Please choose an option--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  )
}