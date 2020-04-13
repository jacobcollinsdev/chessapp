const target = document.getElementById("target");
const stats = document.getElementById("stats");
const strt = document.getElementById("start");
const cntdwn = document.getElementById("countdown");
const scoreOutput = document.getElementById("score-output");
const board = document.getElementsByClassName('board')[0];
const settings = document.getElementById('settings');

var score = 0;
var tries = 0;

//----------------------------------------------------------------

//To deposit all board coordinates into an array
let squareset = []; 

document.querySelectorAll('.square').forEach(item => {
    squareset.push(item.id); //populates the squareset array with the id of each item
})

//Generate Random Coordinate
function rndSq(set) {
    return set[Math.floor(Math.random()* set.length)];
}

//Initial Random Coord for Game Start
let randomSquare = rndSq(squareset);

let gametimer;

function gameTime() {
    var timeFormat = document.getElementById("time-format").value;
    let gametime = timeFormat
    gametimer = setTimeout(function() {
        end();
    }, gametime * 1000);
}


//3-2-1 Game Start Countdown

var count = 3;
var timer;

function startTimer(count){
    settings.style.visibility = 'hidden';
    if(count === 0) {
        startGame();
    } else {
        target.innerText = count;
        setTimeout(function() {startTimer(--count);}, 1000);
    }
}

//Start Game Button
document.getElementsByTagName("img")[0].addEventListener("click", ()=> {
    stats.style.visibility = "hidden";
    strt.style.visibility = "hidden";
    scoreOutput.innerHTML = "";
    play();
});

document.querySelectorAll('.square').forEach(item => {
    item.addEventListener('click', onClick);
})

function startGame() {
    scoreOutput.classList.add('score-border');
    board.style.pointerEvents = 'all'; //To make the board active
    target.innerHTML = randomSquare; //First Target
    gameTime() //Start Game timer
    var timeFormat = document.getElementById("time-format").value;
    cntdwn.style.visibility = 'visible';
    clock(timeFormat);
};

function onClick(event) {
    const item = event.target;
    console.log(item.id); // <-- to show the clicked coord in console.
    if(item.id == randomSquare) {
        score++
        tries++
        scoreOutput.innerHTML = score;
        randomSquare = rndSq(squareset);
        target.innerHTML = randomSquare;
        scoreOutput.classList.add('correct');
        scoreOutput.classList.remove('incorrect');
    } else {
        tries++;
        scoreOutput.innerHTML = score;
        randomSquare = rndSq(squareset);
        target.innerHTML = randomSquare;
        scoreOutput.classList.remove('correct');
        scoreOutput.classList.add('incorrect');
    };
}


//Reset Game
function reset() {
    tries=0;
    score=0;
    settings.style.visibility = 'visible';
    target.innerHTML = '';
    strt.style.visibility = "visible";
    cntdwn.style.visibility = 'hidden';
    board.style.pointerEvents = 'none';
    scoreOutput.classList.remove('incorrect');
    scoreOutput.classList.remove('correct');
    // scoreOutput.innerHTML = '';
}

//End Game
function end() {
    scoreOutput.classList.remove('score-border');
    scoreOutput.classList.add('score-output-width');
    scoreOutput.innerHTML = "Time's Up! You scored " + score + " points!"
    reset();
}

//Countdown Clock to display Game Time Remaining
function clock(timeMode){
    if(timeMode ===3){
        outro();
    }
    if(timeMode === 0) {
        return 
    } else {
        cntdwn.innerHTML = timeMode //time selected by user.
        setTimeout(function() {
            clock(--timeMode);
        }, 1000);
    }
}
 


//Assistance Setting
var files = document.querySelectorAll(".file");
var ranks = document.querySelectorAll(".rank");

var f = files.length;
var r = ranks.length;


function setDifficulty(){
    if(document.getElementById("checkbox").checked){
        for(var i = 0; i < 8 ; i++){
            files[i].style.visibility = 'visible';
            ranks[i].style.visibility = 'visible';
        }
    }else {
        for(var i = 0; i < 8 ; i++){
            files[i].style.visibility = 'hidden';
            ranks[i].style.visibility = 'hidden';
        }
    }
}

//Audio Effects
function play(){
    var audio = new Audio('audio/Count-Down.mp3');
    audio.preload = "auto";
    audio.play();
};

function outro(){
    var audio = new Audio('audio/Count-Out.mp3');
    audio.preload = "auto";
    audio.play();
};