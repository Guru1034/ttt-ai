export const checkWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningCombination: combination };
    }
  }

  // Check for a draw
  if (board.every(cell => cell)) {
    return { winner: 'Draw', winningCombination: null };
  }

  // No winner yet
  return { winner: null, winningCombination: null };
};
