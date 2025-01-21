// Initial data
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let currentPlayer = '';
let message = '';
let isPlaying = false;

reset();

// Events
document.querySelector('.reset-button').addEventListener('click', reset);
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Functions
function handleCellClick(event) {
    let square = event.target.getAttribute('data-square');
    if (isPlaying && board[square] === '') {
        board[square] = currentPlayer;
        updateBoard();
        togglePlayer();
    }
}

function reset() {
    message = '';

    let random = Math.floor(Math.random() * 2);
    currentPlayer = random === 0 ? 'x' : 'o';

    for (let key in board) {
        board[key] = '';
    }
    isPlaying = true;

    updateBoard();
    updateStatus();
}

function updateBoard() {
    for (let key in board) {
        let cell = document.querySelector(`div[data-square=${key}]`);
        cell.innerHTML = board[key];
    }

    checkGameStatus();
}

function updateStatus() {
    document.querySelector('.turn').innerHTML = currentPlayer;
    document.querySelector('.result').innerHTML = message;
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateStatus();
}

function checkGameStatus() {
    if (checkWinner('x')) {
        message = '"X" wins!';
        isPlaying = false;
    } else if (checkWinner('o')) {
        message = '"O" wins!';
        isPlaying = false;
    } else if (isBoardFull()) {
        message = 'It\'s a draw!';
        isPlaying = false;
    }
}

function checkWinner(player) {
    let winningCombinations = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let combo of winningCombinations) {
        let positions = combo.split(',');
        if (positions.every(pos => board[pos] === player)) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return Object.values(board).every(square => square !== '');
}
