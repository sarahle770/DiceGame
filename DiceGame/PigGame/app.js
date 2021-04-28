let scores, roundScore, activePlayer, dice
let winningScore = 100
let gameOn

inIt()

function gameOver() {
    /* 1. Announce the winner!*/
    document.getElementById("name-" + activePlayer).textContent = "Winner!"
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner")
    /* 2. Reset current score*/
    resetRoundScore()
    /* 3. Hide the dice*/
    hideDice()
    /* End the game*/
    gameOn = false
}
function inIt() {
    /* General initial values*/
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameOn = true;
    hideDice()

    document.querySelector(".dice").style.display = "none"

    /* Reset global scores*/
    document.getElementById("score-0").textContent = 0
    document.getElementById("score-1").textContent = 0
    /* Reset round scores*/
    document.getElementById("current-0").textContent = 0
    document.getElementById("current-1").textContent = 0
    /* Reset players name*/
    document.getElementById("name-0").textContent = "Player 1 "
    document.getElementById("name-1").textContent = "Player 2 "

    let panel0 = document.querySelector(".player-0-panel")
    let panel1 = document.querySelector(".player-1-panel")

    panel0.classList.remove("winner")
    panel1.classList.remove("winner")
    panel0.classList.remove("active")
    panel1.classList.remove("active")

    panel0.classList.add("active")
}

/*Attach an anonymous listener for the roll button*/
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gameOn) {
        //1.Get a random number.
        dice = Math.floor(Math.random() * 6) + 1
        /*2.Display the result.*/
        let diceElement = document.querySelector(".dice")
        /*Show the dice!*/
        diceElement.style.display = "block"
        /*Set the image for the dice according to the random number*/
        diceElement.src = "dice-" + dice + ".png"
        //3.If the number is not 1 update the roundScore.

        if (dice !== 1) {
            /*3.1 Add the dice value to the roundScore*/
            roundScore += dice
            /*3.2 Display the roundScore on current-0 or current -1 ID's.*/
            /*3.2 In accordance to the activePlayer value.*/
            document.querySelector("#current-" + activePlayer).textContent = roundScore
        } else {
            nextPlayer()
        }
    }
})

document.querySelector(".btn-keep").addEventListener("click", function () {
    if (gameOn) {
        /* 1.Add the roundScore to the global score of the player*/
        scores[activePlayer] += roundScore
        /* 2. Show the global score  on score-0/score-1*/
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]
        // might write also like that document.getElementById("score-"+activePlayer).textContent=scores[activePlayer]
        /* Do we have a winner?! :-0*/
        if (scores[activePlayer] >= winningScore) {
            gameOver()
        } else {
            /* 4.Switch player*/
            nextPlayer()
        }
    }
})

//Adding a eventListener the newGame button
document.querySelector(".btn-new").addEventListener('click', function () {
    inIt();
})

function resetRoundScore() {
    roundScore = 0
    /* Reset also the display*/
    document.getElementById("current-" + activePlayer).textContent = roundScore
}

function toggleActtive() {
    /* Hightlight the active panel for the active player*/
    document.querySelector(".player-0-panel").classList.toggle("active")
    document.querySelector(".player-1-panel").classList.toggle("active")
}


function nextPlayer() {
    resetRoundScore()
    /* Next Player */
    activePlayer = Math.abs(activePlayer - 1)
    toggleActtive()
    /* Hide the dice */
    hideDice()
}

function hideDice() {
    document.querySelector(".dice").style.display = "none"
}


