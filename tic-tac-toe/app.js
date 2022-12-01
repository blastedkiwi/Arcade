//SUBMITTING THIS AS WELL AS THIS CODE IS FULLY FUNCTIONING

// STATE //

let mark = "❌";
let winningLetter = "";
let turns = 0;

// GAME LOGIC //
function doWhenClick(grid) { 	
	grid.value = mark;
	grid.innerHTML = mark;
	grid.disabled = true;

	if(checkIfWin() && winningLetter.length != 0) {
		document.getElementById("result").innerHTML = winningLetter + " wins!"; 
		manageButtons("disable");
	}
	else if(turns < 8) {
		changeMark();
		document.getElementById("result").innerHTML = mark + "'s turn to pick."; 
	}
	else {
		document.getElementById("result").innerHTML = "Game ends in a draw!"; 
	}
	turns++;
}

function changeMark(){
	if(mark == "❌")
		mark = "⭕️";
	else
		mark = "❌";
}

function checkIfWin(){
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
	let val1 = document.getElementById(num1).value;
	let val2 = document.getElementById(num2).value;
	let val3 = document.getElementById(num3).value;
	
	if(val1 != null && val1 == val2 && val2 != null && val2 == val3 && val3 != null)
	{
		winningLetter = val1;
		return true;
	}
	else {
		return false;
	}
}

//RESETTING BOARD//

function manageButtons(command) {
	if(command == "disable") {
		let elems = document.getElementsByClassName("buttons"); //change class buttons name and on html too
		for(let i = 0; i < elems.length; i++) {
			elems[i].disabled = true;
		}
	}
	else if(command == "enable") {
		let elems = document.getElementsByClassName("buttons"); //change classcbuttons name and on html too
		for(let i = 0; i < elems.length; i++) {
			elems[i].disabled = false;
			elems[i].innerHTML = "";
			elems[i].value = "";
		}
	}
}

function nextGame(){
	manageButtons("enable");
	mark = "❌";
	winningLetter = "";
	turns = 0;
	document.getElementById("result").innerHTML = mark + " takes their pick.";
}
