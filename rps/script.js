
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let r = getRandomInteger(0, 2);
    return choices[r];
}

function getRandomInteger(low, high) {
    let r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    if (playerSelection == "rock" && computerSelection == "rock"
        || playerSelection == "paper" && computerSelection == "paper"
        || playerSelection == "scissors" && computerSelection == "scissors") {
        return "Tie";
    }
    if (playerSelection == "rock" && computerSelection == "scissors") {
        return "You win! Rock beats Scissors";
    } else if (playerSelection == "rock" && computerSelection == "paper") {
        return "You lose! Paper beats Rock";
    } else if (playerSelection == "paper" && computerSelection == "scissors") {
        return "You lose! Scissors beats Paper";
    } else if (playerSelection == "paper" && computerSelection == "rock") {
        return "You win! Paper beats Rock";
    } else if (playerSelection == "scissors" && computerSelection == "paper") {
        return "You win! Scissors beats Paper";
    } else if (playerSelection == "scissors" && computerSelection == "rock") {
        return "You lose! Rock beats Scissors";
    }
}
function game() {

    const choices = document.querySelectorAll(".choice");
    const output = document.querySelector(".output");
    const player_score_display = document.querySelector(".score.player");
    const computer_score_display = document.querySelector(".score.computer");

    let player_score = 0;
    let computer_score = 0;

    for (let choice of choices) {

        choice.addEventListener("click", () => {

            let playerSelection = choice.textContent;
            let computerSelection = getComputerChoice();
            let result = playRound(playerSelection, computerSelection);

            if (result.includes("win")) {
                player_score++;
            } else if (result.includes("lose")) {
                computer_score++;
            }

            output.textContent = result;
            player_score_display.textContent = player_score;
            computer_score_display.textContent = computer_score;

            if (player_score > 4 || computer_score > 4) {
                if (player_score > computer_score) {
                    output.textContent = "You won the game!";
                } else if (player_score < computer_score) {
                    output.textContent = "You lost the game!";
                } else {
                    output.textContent = "WOW! It's a tie 5:5";
                }
                player_score = 0;
                computer_score = 0;
            }
        });
    }
}
    game();