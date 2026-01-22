// Getting all required elements from the DOM
let img = document.querySelectorAll(".img");       // All clickable images: rock, paper, scissors
let user = document.querySelector(".you");         // User score element
let pc = document.querySelector(".pc");            // PC score element
let resetbtn = document.querySelector(".reset");   // Reset button
let msg = document.querySelector(".msg");          // Message area (to show result like Win/Lose/Draw)
const winSound = new Audio("Audio/win.mp3");       // Access win audio
const loseSound = new Audio("Audio/lose.mp3");     // Access lose audio
// Initial score values
let pcScore = 0;
let userScore = 0;

// Function to reset everything (scores and message)
let reset = () => {
    pcScore = 0;
    userScore = 0;
    msg.innerText = "Play Your Turn";
    msg.style.backgroundColor = "white";
    msg.style.color = "grey";
    user.innerText = userScore;
    pc.innerText = pcScore;
}

// Event listener for Reset button
resetbtn.addEventListener("click", reset);

// Function to generate random choice for PC
const pcChoice1 = () => {
    let arr = ["rock", "paper", "scissors"];
    let a = Math.floor(Math.random() * 3); // Picks 0, 1, or 2 randomly
    return arr[a]; // Returns corresponding choice
}

// Function to update user score , UI and play win sound
const showUserScore = () => {
    userScore++;
    user.innerText = userScore;
    winSound.play();
}

// Function to show draw message and style
const draw = () => {
    msg.innerText = "Game Draw, Please Play Again!";
    msg.style.backgroundColor = "yellow";
    msg.style.color = "black";
}

// Main function that compares user and pc choice and updates game state
const playGame = (userChoice, pcChoice) => {
    // All possible winning conditions for user
    if (userChoice === "rock" && pcChoice === "scissors") {
        msg.innerText = "You Win!";
        msg.style.color = "white";
        msg.style.backgroundColor = "Green";
        showUserScore();
    }
    else if (userChoice === "paper" && pcChoice === "rock") {
        msg.innerText = "You Win!";
        msg.style.color = "white";
        msg.style.backgroundColor = "Green";
        showUserScore();
    }
    else if (userChoice === "scissors" && pcChoice === "paper") {
        msg.innerText = "You Win!";
        msg.style.color = "white";
        msg.style.backgroundColor = "Green";
        showUserScore();
    }
    // If both choose same — it's a draw
    else if (userChoice === pcChoice) {
        draw();
    }
    // If none of above matched — user loses
    else {
        msg.innerText = "You lose";
        msg.style.backgroundColor = "Red";
        msg.style.color = "white";
        pcScore++;
        pc.innerText = pcScore;
        loseSound.play();
    }
}

// Adding click listeners to all images
img.forEach((choice) => {
    choice.addEventListener("click", () => {
        // When user clicks — get their choice
        let userChoice = choice.getAttribute("id");
        
        // Generate random PC choice
        let pcChoice = pcChoice1();

        // Just for debugging: print choices to console
        console.log("user", userChoice);
        console.log("pc", pcChoice);

        // Call game logic function
        playGame(userChoice, pcChoice);
    })
})
