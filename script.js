const target = document.getElementById("target");
const stats = document.getElementById("stats");
const strt = document.getElementById("start");
const cntdwn = document.getElementById("countdown");
const scoreOutput = document.getElementById("score-output");
const board = document.getElementsByClassName('board')[0];
const settings = document.getElementById('settings');

var score = 0;
var tries = 0;

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

// Welcome Message
var startContent = "<h2>Welcome to the Chess Coordinate Trainer</h2>"
startContent += "<p>The concept is simple.</p>"
startContent += "<p>Once you have clicked &quot;Start&quot;, a random co-ordinate relating to a square on the chess board will be generated.</p>"
startContent += "<p>Click the corresponding square, and try to score as many points as you can before you run out of time.</p>"
startContent += "<p>The goal is to be fast <em>and</em> accurate.</p><p>Good luck!</p>"

stats.innerHTML = startContent;


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


//Game Time Length Display
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
    strt.style.visibility = "hidden";
    stats.innerHTML = "";
    play();
});

document.querySelectorAll('.square').forEach(item => {
    item.addEventListener('click', onClick);
})

function startGame() {
    board.style.pointerEvents = 'all'; //To make the board active
    target.innerHTML = randomSquare; //First Target
    gameTime() //Start Game timer
    var timeFormat = document.getElementById("time-format").value;
    cntdwn.style.visibility = 'visible';
    clock(timeFormat);
};

function onClick(event) {
    const item = event.target;
    console.log(item.id); // to show the clicked coord in console (for troubleshooting)
    if(item.id == randomSquare) {
        score++
        tries++
        stats.innerHTML = score;
        randomSquare = rndSq(squareset);
        target.innerHTML = randomSquare;
        stats.classList.add('correct');
        stats.classList.remove('incorrect');
    } else {
        tries++;
        stats.innerHTML = score;
        randomSquare = rndSq(squareset);
        target.innerHTML = randomSquare;
        stats.classList.remove('correct');
        stats.classList.add('incorrect');
    };
}

//End Game
function end() {
    stats.classList.add('score-output');
    stats.innerHTML = "Time's Up! You scored " + score + " points!"
    reset();
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
    stats.classList.remove('incorrect');
    stats.classList.remove('correct');

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

//Choose Game Time Length
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
