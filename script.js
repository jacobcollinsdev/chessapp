const target = document.getElementById("target");
const stats = document.getElementById("stats");
const strt = document.getElementById("start");
const rst = document.getElementById("reset");
const scoreDisplay = document.getElementById("score-display");
let board = document.getElementsByClassName('board')[0];

var score = 0;
var tries = 0;
//----------------------------------------------------------------

//DEPOSIT ALL BOARD COORDINATES INTO A VARIABLE
let squareset = []; //creates an empty array called squareset.

document.querySelectorAll('.square').forEach(item => {
    squareset.push(item.id); //populates the squareset array with the id of each item
})

//GENERATE RANDOM COORDINATE
function rndSq(set) {
    return set[Math.floor(Math.random()* set.length)];
}

//INITIAL RANDOM COORDINATE FOR GAME START
let randomSquare = rndSq(squareset);

//Game length in seconds
let gametime = 10;
//Game timer
let gametimer;

function gameTime() {
    gametimer = setTimeout(function() {
        //end game when time runs out
        end();
    }, gametime * 1000);
}

//Square Click Events
function startGame() {

    //First Target
    target.innerHTML = randomSquare;

    //Start Game timer
    gameTime()

    document.querySelectorAll('.square').forEach(item => {
        item.addEventListener('click', event => {
            if(item.id == randomSquare) {
                score++
                tries++
                scoreDisplay.innerHTML = score;
                randomSquare = rndSq(squareset);
                target.innerHTML = randomSquare;
            } else {
                tries++;
                // scoreDisplay.innerHTML = score;
                randomSquare = rndSq(squareset);
                target.innerHTML = randomSquare;
            };
        })
    })
};

//Reset Game
function reset() {
    tries=0;
    score=0;
    target.innerHTML = '';
    strt.style.visibility = "visible";
    rst.style.visibility = 'hidden';
    // board.style.pointerEvents = 'none'; //THIS ACHIEVES NO POINTER EVENTS ON GAME FINISH
}

//3-2-1 COUNTDOWN

var count = 3;
var timer;

function startTimer(count){
    scoreDisplay.innerHTML ='';
    if(count === 0) {
        startGame();
        rst.style.visibility = "visible";    
    } else {
        target.innerText = count;
        setTimeout(function() {startTimer(--count);}, 1000);
    }
}

function end() {
    scoreDisplay.innerHTML = "Time's Up! You scored " + score + " points!"
    reset();
}

//Start Game Button
document.getElementsByTagName("img")[0].addEventListener("click", ()=> {
    stats.style.visibility = "hidden";
    strt.style.visibility = "hidden";
});

//Reset Game Button
rst.addEventListener('click', event => {
    reset();
});
