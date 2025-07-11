/* * * * * * * * * * *
 * Tic Tac Toe Game  *
 * * * * * * *  * * */
import player from './player.js';

/* Game Board function 
 *
 * Responsible for checking the game state
 * 
 * @returns {Object} - methods to interact with the game board
 * */
const gameBoard = (() => {
  const gameState = ['', '', '', '', '', '', '', '', ''];
  let gameStatus = true;

  // Initialize gameState with Cell objects
  const initializeGameState = () => {
    for (let i = 0; i < gameState.length; i++) {
      gameState[i] = Cell();
    }
  }



  const checkGameStatus = () => {
    // check every 3rd cell for a win
    const winPatterns = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal \
      [2, 4, 6] // Diagonal /
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameState[a].getValue() &&
        gameState[a].getValue() === gameState[b].getValue() &&
        gameState[a].getValue() === gameState[c].getValue()) {
        console.log(`Player ${gameState[a].getValue()} wins!`);
        return gameStatus = false;
      }
    }
    return gameStatus = true; // Game continues if no winner found
  }

  const getGameStatus = () => {
    return gameStatus;
  }

  const getboard = () => {
    return gameState;
  }



  return {
    getBoard: getboard,
    getGameStatus,
    checkGameStatus,
    initializeGameState
  };
})();

function Cell() {
  let value = '';

  const setValue = (player) => {
    if (value === '') {
      value = player;
    } else {
      console.log('Cell already occupied');
    }
  }

  const getValue = () => value;

  return {
    getValue,
    setValue
  };
}

const gameController = (() => {
  let gameStatus = true; // True for running, false if done
  let currentPlayer; // Default player

  const makeAMove = (player, cellIdx) => {
    if (gameBoard.getBoard()[cellIdx].getValue() === '') {
      gameBoard.getBoard()[cellIdx].setValue(player);
      // printToConsole();
      gameStatus = gameBoard.checkGameStatus();
      if (gameStatus) {
        console.log(`Player ${player} made a move at cell ${cellIdx}`);
        switchPlayer();
      } else {
        console.log(`Game Over! Player ${player} wins!`);
      }
    } else {
      console.log(`Cell ${cellIdx} is already occupied`)
    }
  };

  const initializeGame = () => {
    gameBoard.getBoard().forEach(cell => cell.setValue(''));
    gameStatus = true;
    let player1 = new player('Player X', 'X');
    let player2 = new player('Player O', 'O');
    currentPlayer = player1.getToken();
    console.log('Game initialized');
  }

  // Reset the game state
  const resetGame = () => {
    gameBoard.initializeGameState();
    gameStatus = true;
    console.log('Game reset');
  };

  // Switch player input
  const switchPlayer = () => {
    console.log(`Switching player from ${currentPlayer}`);
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
  }

  // New method to get the current player
  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const getGameStatus = () => {
    return gameStatus;
  }

  return {
    initializeGame,
    getGameStatus,
    makeAMove,
    resetGame,
    getCurrentPlayer,
  };
})();

function printToConsole() {
  console.log('Current Game State:');
  console.log(gameBoard.getBoard().map(cell => cell.getValue()).join(' | '));
}

const displayController = (() => {
  const disableBoard = (items) => {
    items.forEach(item => {
      item.removeEventListener('click', () => {});
      item.setAttribute('disabled', true);
    });
  }

  // reset the game board
const resetBoard = () => {
    const boardElement = document.querySelector('.board');
    const outputElement = document.querySelector('.output');
    const outputList = outputElement.querySelector('ul');
    if (outputList) {
      outputList.innerHTML = ''; // Clear the output list
    }
    boardElement.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = ''; // Clear the cell content
      cell.removeAttribute('disabled'); // Enable the cells again
    });

    gameController.resetGame();
  }

  const resetButton = document.querySelector('.reset-button');
  resetButton.addEventListener('click', resetBoard);

  const boardElement = document.querySelector('.board');
  const outputElement = document.querySelector('.output');
  const outputList = document.createElement('ul');
  outputElement.appendChild(outputList);
  const boardCells = Array.from(boardElement.children);
  boardCells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      const currentPlayerToken = gameController.getCurrentPlayer();
      console.log(`Current Player: ${currentPlayerToken}`);
      index = +cell.dataset.cellId - 1;
      const outputListItem = document.createElement('li');
      // outputListItem.textContent = `Player ${currentPlayerToken} clicked cell ${index + 1}`;
      // outputList.appendChild(outputListItem);
      console.log(`Player ${currentPlayerToken} clicked cell ${index}`);
      gameController.makeAMove(currentPlayerToken, index);
      console.log(`Cell ${index} updated with value ${gameBoard.getBoard()[index].getValue()}`);
      cell.textContent = gameBoard.getBoard()[index].getValue();
      outputListItem.textContent = `Now it's Player ${gameController.getCurrentPlayer()}'s turn`;
      outputList.appendChild(outputListItem);
      outputElement.scrollTop = outputElement.scrollHeight;
      if (!gameBoard.getGameStatus()) {
        const gameOverItem = document.createElement('li');
        gameOverItem.textContent = `Game Over! Player ${currentPlayerToken} wins!`;
        outputList.appendChild(gameOverItem);
        outputElement.scrollTop = outputElement.scrollHeight;
        disableBoard(boardCells);
      }
    });
  })
})();

window.onload = () => {
  gameBoard.initializeGameState();
  gameController.initializeGame();

}
