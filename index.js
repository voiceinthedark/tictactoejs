/* * * * * * * * * * *
 * Tic Tac Toe Game  *
 * * * * * * *  * * */


/* Game Board function 
 *
 * Responsible for checking the game state
 * 
 * @returns {string[]} gameState - An array of Cell objects representing the game board
 * */
const gameBoard = (() => {
    const gameState = ['', '', '', '', '', '', '', '', ''];

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
                return;
            }
        }
    }



    return {
        gameState,
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

    const makeAMove = (player, cellIdx) => {
        if (gameBoard.gameState[cellIdx].getValue() === '') {
            gameBoard.gameState[cellIdx].setValue(player);
            printToConsole();
            gameBoard.checkGameStatus();

        } else {
            console.log(`Cell ${cellIdx} is already occupied`)
        }
    };

    const initializeGame = () => {
        gameBoard.gameState.forEach(cell => cell.setValue(''));
        gameStatus = true;
        console.log('Game initialized');
    }

    // Reset the game state
    const resetGame = () => {
        gameBoard.initializeGameState();
        gameStatus = true;
        console.log('Game reset');
    };

    return {
        initializeGame,
        gameStatus,
        makeAMove,
        resetGame
    };
})();

function printToConsole() {
    // Print every 3 cells on a new line 
    console.log('Current Game State:');
    console.log(gameBoard.gameState.map(cell => cell.getValue()).join(' | '));
}

const displayController = (() => {


})();

// Player Factory function, contains player token and name
const playerFactory = () => {

    const player = {
        name: 'Player X',
        token: 'X',
    }
    const bot = {
        name: 'Bot O',
        token: 'O',
    };
    return {
        player,
        bot
    };
};


// Init Game
gameBoard.initializeGameState();
gameController.initializeGame();
gameController.makeAMove(playerFactory().player.token, 0);
gameController.makeAMove(playerFactory().player.token, 0); // Should print Cell 0 already occupied
gameController.makeAMove(playerFactory().bot.token, 2);
gameController.makeAMove(playerFactory().player.token, 3);
gameController.makeAMove(playerFactory().player.token, 6); // Player X wins
