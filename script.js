/*select all the buttons*/
let boxes = document.querySelectorAll(".box");

/*select reset button*/
let resetbtn = document.querySelector("#resetbtn");

/**select new game button */
let newGame = document.querySelector("#newGame");
let gameStart = document.querySelector(".gameStart");
let msgcontainer = document.querySelector(".msg-con");
let msg = document.querySelector("#msg");

//total turns already played
let totClick = 0;

let showWinExe = false; //if showWinner function is executed
let turnO = true; //player O's turn

for (let b of boxes) {
    b.disabled = true;
}

/*function for player to select X or O*/
function selectPlayer() {
    let a = prompt("Welcome! Who wants to go first? Select 1 for X or anything else for 0");
    if (a == "1") {
        turnO = false;
    }
    for (let b of boxes) {
        b.disabled = false;
    }
    gameStart.classList.add("hide");
}
//selectPlayer();

/**saving all the possible winning patterns into an array */
let winningP = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

//adding event listener to each button
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        /*when a button is clicked, this function will be executed */
        //increment the turns already played
        totClick += 1;

        //if its player O's turn fill button with O
        if (turnO) {
            box.innerText = 'O';
            turnO = false; /**giving next turn to X */
        }
        //else fill button with x
        else {
            box.innerText = 'X';
            turnO = true; /**giving next turn to O */
        }
        //to avoid clicking the button again once it is already clicked
        box.disabled = true;
        findWinner(); //to see if there is already a winner
    });
});

const findWinner = () => {

    for (pattern of winningP) {
        /*for every array in winningP, select the innerText of the corresponding buttons and check if they all are same and are not blank*/
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;
        if (posVal1 != "" && posVal2 != "" && posVal3 != "") { /**making sure no button text is blank */
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                console.log("Winner");
                /*disable all the buttons*/
                for (let b of boxes) {
                    b.disabled = true;
                }
                showWin(posVal1);
            }
            /*when all the nine turns are over, but there is no winner, its a draw*/
            else if (totClick == 9 && showWinExe === false) {
                msg.innerHTML = "It's a draw";
                msgcontainer.classList.remove("hide");
                gameStart.classList.add("hide");
            }
        }
    }
};

const showWin = (win) => {
    //set showWinExe to true
    showWinExe = true;
    //change the inner text of msg paragraph
    msg.innerText = `Hurrray! ${win} is the winner`;
    /*make the msg conatiner visible, by removing hide class from the class list*/
    msgcontainer.classList.remove("hide");
    gameStart.classList.add("hide");
};

const resetGame = () => {
    //allow user to select player
    selectPlayer();
    //reset total turns to 0
    totClick = 0;
    //all buttons enabled
    //remove the text from all buttons
    for (let b of boxes) {
        b.disabled = false;
        b.innerText = "";
    }
    //hide the msg conatiner again
    msgcontainer.classList.add("hide");
    //hide the start game button
    gameStart.classList.add("hide");
};

function startGame() {
    resetGame();
    gameStart.classList.add("hide");
}

resetbtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
gameStart.addEventListener("click", startGame);
//above two are event listeners for when buttons are clicked