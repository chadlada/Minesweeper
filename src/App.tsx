import React from 'react'

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
