// THIS VERSION IS ONLY HALF-FUNCTIONING, 
// STILL TRYING TO INJECT THE GAME LOGIC FROM OTHER VERSION TO WORK HERE

// APP.JS //

// STATE //

let mark = '❌';
let winningLetter = '';
let turns = 0;
let state = {};

const resetState = () => {
    state.board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
    state.players =['', ''];
    state.score =['', ''];
    state.currentPlayerIdx = 0;
};

// DOM SELECTORS //

const boardElem = document.querySelector('#ticBoard');
const playerTurnElem = document.querySelector('#playerBoard');
const grid = document.querySelectorAll('.cell');
//this is where I would declare the winning player and the restart button
const winElem = document.querySelector('#resetBoard');

// GAME LOGIC HELPER FUNCTIONS //

function changeTurn() {
    //switch players
    state.currentPlayerIdx = Math.abs(state.currentPlayerIdx - 1);
}

function changeMark() {
	if(mark == "❌")
		mark = "⭕️";
	else
		mark = "❌";
}

//trying to get this whole block of code to work with the rest of the game
function doWhenClick() { 	
	if(checkIfWin() && winningLetter.length != 0) {
		winElem.innerHTML = winningLetter + " wins!"; 
		manageButtons("disable");
	}
	else {
		winElem.innerHTML = "Game ends in a draw!"; 
	}
	turns++;
}

function checkIfWin(){
    const grid = document.querySelectorAll('.cell');
	//horizontal
	for(let ctr = 1; ctr <=7; ctr = ctr + 3) {
		if(checkLine(ctr, ctr+1, ctr+2)) {
			return true;
		}
	}
	
	//vertical
	for(let ctr = 1; ctr <=3; ctr++) {
		if(checkLine(ctr, ctr+3, ctr+6)) {
			return true;
		}
	}
	
	//diagonal down
	if(checkLine(1, 5, 9)) {
		return true;
	}
	
	//diagonal up
	if(checkLine(3, 5, 7)) {
		return true;
	}
}

function checkLine(num1, num2, num3) {
	let val1 = grid.value(num1);
	let val2 = grid.value(num2);
	let val3 = grid.value(num3);
 
	if(val1 != null && val1 == val2 && val2 != null && val2 == val3 && val3 != null)
	{
		winningLetter = val1;
		return true;
	}
	else {
		return false;
	}
}


// DOM MANIPULATION FUNCTIONS //

const renderBoard = () => {
    boardElem.innerHTML = '';
    //iterate through state.board
    for(let i = 0; i < state.board.length; i++) {
        const grid = state.board[i];
        //create elements         
        const cellElem = document.createElement('button');
        cellElem.classList.add('cell');

        //if (grid.onClick) cellElem.innerText = grid.value;

        cellElem.dataset.index = i;
        //append them to the parent element
        boardElem.appendChild(cellElem);
    }
}

const updateBoard = () => {
    const grid = document.querySelectorAll('.cell');
    
    for(let i = 0; i < state.board.length; i++) {
        grid[i].innerHTML = state.board[i];
    }
}

//not sure where to put this to work
//make sure the board is clear
function deleteAllChildNodes(parent) {
    //to remove all of the children from the nodes, you need a while loop 
    //while the parents have children, removed them
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

//conditionally render players
const renderPlayer = () => {
    //if there are no players we want to display an input
    if(!state.players[0] || !state.players[1]) {
        text = 
        `<input name="player1" placeholder="Enter Player 1" /> 
        <input name="player2" placeholder="Enter Player 2" />
        <br/> <br/> 
        <button class="start">Start Game</button>`
    }
    else {
        //if we do have players display value
        text = 
        `It's currently <span class='player'>${state.getCurrentPlayer()}
        </span>'s turn.`
    }
    playerTurnElem.innerHTML = text;
};


const render = () => {
    updateBoard();
    renderPlayer();
};

// EVENT LISTENERS //

boardElem.addEventListener('click', (event) => {
    const cellIdx = event.target.dataset.index;
    state.board[cellIdx] = mark;
    changeMark();
    changeTurn();
    //trying to see if the function would work but it doesn't
    //checkIfWin();
    render();
});

playerTurnElem.addEventListener('click', (event) => {
    if(event.target.className === 'start') {
        //input of player 1
        const player1Input = document.querySelector('input[name=player1]');
        //get the value from the input
        const player1Value = player1Input.value;
        state.players[0] = player1Value;

        //input of player 2
        const player2Input = document.querySelector('input[name=player2]');
        //get the value from the input
        const player2Value = player2Input.value;
        state.players[1] = player2Value;
        render();
    };    
});



// BOOTSTRAPPING //

resetState();
renderBoard();
render();