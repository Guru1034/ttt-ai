// utils/ai.js

  import { checkWinner } from './gameUtils';

export const makeComputerMove = (board, difficulty, computerSymbol) => {
  switch (difficulty) {
    case 'Easy':
      return makeRandomMove(board, computerSymbol);
    case 'Medium':
      return makeMediumMove(board, computerSymbol);
    case 'Hard':
      return makeBestMove(board, computerSymbol);
    default:
      return makeRandomMove(board, computerSymbol);
  }
};

const makeRandomMove = (board, computerSymbol) => {
  const availableSquares = board
    .map((square, index) => (square === null ? index : null))
    .filter((square) => square !== null);
  
  const randomIndex = Math.floor(Math.random() * availableSquares.length);
  const newBoard = [...board];
  newBoard[availableSquares[randomIndex]] = computerSymbol;
  return newBoard;
};

const makeMediumMove = (board, computerSymbol) => {
  const playerSymbol = computerSymbol === 'X' ? 'O' : 'X';
  
  // Check if the AI can win
  const winningMove = findWinningMove(board, computerSymbol);
  if (winningMove !== null) {
    const newBoard = [...board];
    newBoard[winningMove] = computerSymbol;
    return newBoard;
  }

  // Check if the player can win in the next move and block it
  const blockingMove = findWinningMove(board, playerSymbol);
  if (blockingMove !== null) {
    const newBoard = [...board];
    newBoard[blockingMove] = computerSymbol;
    return newBoard;
  }

  return makeRandomMove(board, computerSymbol);
};


  // Find a winning move for a given player ('X' or 'O')
  const findWinningMove = (board, player) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = player;
        const result = checkWinner(newBoard);
        if (result.winner === player) {
          return i; // Return the winning move index
        }
      }
    }
    return null;
  };

const makeBestMove = (board, computerSymbol) => {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = computerSymbol;
      let score = minimax(board, 0, false, computerSymbol);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  const newBoard = [...board];
  newBoard[move] = computerSymbol;
  return newBoard;
};

const minimax = (board, depth, isMaximizing, computerSymbol) => {
  const playerSymbol = computerSymbol === 'X' ? 'O' : 'X';
  const result = checkWinner(board);
  if (result.winner === computerSymbol) return 1;
  if (result.winner === playerSymbol) return -1;
  if (result.winner === 'Draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = computerSymbol;
        let score = minimax(board, depth + 1, false, computerSymbol);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = playerSymbol;
        let score = minimax(board, depth + 1, true, computerSymbol);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
