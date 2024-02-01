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
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is The Garaside known for?",
        options: ["Electronics", "Furniture", "Clothing", "Groceries"],
        correct: "Clothing",
    },
    {
        id: "1",
        question: "Which of the following categories can you find on The Garaside?",
        options: ["Kitchen Appliances", " Gardening Tools", "Fashion Accessories", "All of the above"],
        correct: "Fashion Accessories",
    },
    {
        id: "2",
        question: "What is The Garaside's return policy?",
        options: ["No returns accepted", "30 days return policy", "365 days return policy", "Exchange only"],
        correct: "30 days return policy",
    },
    {
        id: "3",
        question: "Which of the following payment methods does The Garaside accept?",
        options: ["Cash on delivery", "Bitcoin", "Credit/Debit cards", "All of the above"],
        correct: "Credit/Debit cards",
    },
    {
        id: "4",
        question: "What is The Garaside's best-selling clothing item?",
        options: ["Classic White T-shirt", "Black Skinny Jeans", "Red Hoodie", "Floral Sundress"],
        correct: "Classic White T-shirt",
    },
    {
        id: "5",
        question: "How often does The Garaside release new collections?",
        options: [" Monthly", " Quarterly", "Annually", " Irregularly"],
        correct: "Quarterly",
    }, {
        id: "6",
        question: "What does The Garaside offer for first-time customers?",
        options: ["Free shipping", " 10% discount on the first purchase", "Buy one get one free", " Exclusive access to limited edition items"],
        correct: "10% discount on the first purchase",
    },
    {
        id: "7",
        question: "Which social media platform can you follow The Garaside for the latest updates and promotions?",
        options: [" MySpace", "Snapchat", "Instagram", "LinkedIn"],
        correct: "Instagram",
    },
    {
        id: "8",
        question: "What sustainability practices does The Garaside follow in its clothing production?",
        options: ["Fast fashion", "Eco-friendly materials and ethical manufacturing", "No sustainability practices", "Animal fur clothing"],
        correct: "Eco-friendly materials and ethical manufacturing",
    },
    {
        id: "9",
        question: "How can customers contact The Garaside's customer support?",
        options: ["Only through email", "Phone, email, and live chat", "In-person visits only", " Social media comments"],
        correct: " Phone, email, and live chat",
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
            count = 20;
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
    count = 20;
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