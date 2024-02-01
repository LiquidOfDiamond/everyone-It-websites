//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 51;
let countdown;
//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "What is the primary purpose of dry cleaning?",
        options: ["Removing wrinkles", "Washing clothes with water", "Cleaning garments using chemical solvents","Ironing clothes"],
        correct: "Cleaning garments using chemical solvents",
    },
    {
        id: "1",
        question: "Which fabric is typically recommended for dry cleaning instead of regular laundering?",
        options: ["Cotton", "Wool", "Polyester", "Silk"],
        correct: "Wool",
    },
    {
        id: "2",
        question: "How often should you dry clean a suit on average?",
        options: ["After every use", "Once a month", "As needed, based on wear and stains","Twice a year"],
        correct: "As needed, based on wear and stains",
    },
    {
        id: "3",
        question: "What is the main advantage of using professional dry cleaning services over home washing?",
        options: ["Lower cost", "Better stain removal", " Faster process"," Environmental friendliness"],
        correct: "Better stain removal",
    },
    {
        id: "4",
        question: "Why is it essential to check care labels before dry cleaning a garment?",
        options: ["To determine the brand", "To identify the type of fabric and care instructions", " To find the garment's size","Cleaning the buttons and zippers"],
        correct: "To identify the type of fabric and care instructions",
    },
    {
        id: "5",
        question: "What is the purpose of using a garment bag when dropping off clothes for dry cleaning?",
        options: [" Fashion statement", "Protecting clothes during transportation", "Reducing cleaning costs", "Enhancing the cleaning process"],
        correct: "Protecting clothes during transportation",
    }, {
        id: "6",
        question: "Which of the following is a common misconception about dry cleaning",
        options: ["It uses water for cleaning", " All stains can be removed", "It damages clothes over time", "It only works for dark-colored garments"],
        correct: "It uses water for cleaning",
    },
    {
        id: "7",
        question: "How should you store garments after picking them up from the dry cleaner?",
        options: ["In a plastic bag", " In a cool, dry place with good air circulation", "On the bathroom floor", "In direct sunlight"],
        correct: "In a cool, dry place with good air circulation",
    },
    {
        id: "8",
        question: "What type of solvent is commonly used in the dry cleaning process?",
        options: ["Water", "Bleach", " Perchloroethylene (perc)", "Ammonia"],
        correct: " Perchloroethylene (perc)",
    },
    {
        id: "9",
        question: "What does the term dry in dry cleaning refer to?",
        options: ["Absence of liquid water", "Quick turnaround time", "Exclusive use of dry cleaning agents", "Avoiding wet stains"],
        correct: "Absence of liquid water",
    },
];
//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};