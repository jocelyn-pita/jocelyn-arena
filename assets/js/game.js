const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "How many bones are in the human body?",
    choice1: "204",
    choice2: "205",
    choice3: "206",
    choice4: "207",
    answer: 3
  },
  {
    question: "Which structure of the body contains no bones?",
    choice1: "Ear",
    choice2: "Nose",
    choice3: "Hand",
    choice4: "Foot",
    answer: 2
  },
  {
    question: "How many hearts do octopuses have?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3
  },
  {
    question: "What is the heaviest organ in the human body?",
    choice1: "Brain",
    choice2: "Liver",
    choice3: "Heart",
    choice4: "Lung",
    answer: 2
  },
  {
    question: "What is the biggest animal on earth?",
    choice1: "Elephant",
    choice2: "Blue whale",
    choice3: "Great white shark",
    choice4: "Giraffe",
    answer: 2
  },
  {
    question: "What is the largest bone in the human body?",
    choice1: "Tibia",
    choice2: "Femur",
    choice3: "Humerus",
    choice4: "Radius",
    answer: 2
  },
  {
    question: "Which part of the body has the smallest bone?",
    choice1: "Fingers",
    choice2: "Toes",
    choice3: "Ears",
    choice4: "Nose",
    answer: 3
  },
  {
    question: "What part of the body has the thinnest skin?",
    choice1: "Lips",
    choice2: "Eyelids",
    choice3: "Neck",
    choice4: "Armpits",
    answer: 2
  },
  {
    question: "Which part of the body has the largest muscle?",
    choice1: "Thighs",
    choice2: "Arms",
    choice3: "Butt",
    choice4: "Chest",
    answer: 3
  },
  {
    question: "What is the largest organ in the human body?",
    choice1: "Heart",
    choice2: "Liver",
    choice3: "Skin",
    choice4: "Lungs",
    answer: 3
  },
  {
    question: "Which animal is capable of drinking through its skin and eyes?",
    choice1: "Lizard",
    choice2: "Frog",
    choice3: "Snake",
    choice4: "Bird",
    answer: 2
  },
  {
    question: "Which animal’s milk is pink?",
    choice1: "Elephant",
    choice2: "Hippopotamus",
    choice3: "Cow",
    choice4: "Goat",
    answer: 2
  },
  {
    question: "How many teeth does an adult have?",
    choice1: "30",
    choice2: "31",
    choice3: "32",
    choice4: "33",
    answer: 3
  },
  {
    question: "What is the world’s largest desert?",
    choice1: "Sahara Desert",
    choice2: "Arabian Desert",
    choice3: "Antarctic Desert",
    choice4: "Gobi Desert",
    answer: 3
  },
  {
    question: "What is the longest river in the world?",
    choice1: "Amazon River",
    choice2: "Yangtze River",
    choice3: "Mississippi River",
    choice4: "Nile River",
    answer: 4
  },
  {
    question: "Which planet has the most moons?",
    choice1: "Mars",
    choice2: "Saturn",
    choice3: "Jupiter",
    choice4: "Uranus",
    answer: 3
  },
  {
    question: "Which fruit is the most popular and consumed worldwide?",
    choice1: "Apple",
    choice2: "Banana",
    choice3: "Tomato",
    choice4: "Orange",
    answer: 3
  },
  {
    question: "A rainbow consists of how many colors?",
    choice1: "5",
    choice2: "6",
    choice3: "7",
    choice4: "8",
    answer: 3
  },
  {
    question: "What is the name of the largest ocean?",
    choice1: "Atlantic Ocean",
    choice2: "Indian Ocean",
    choice3: "Pacific Ocean",
    choice4: "Arctic Ocean",
    answer: 3
  },
  {
    question: "Who is the king of the gods in Greek mythology?",
    choice1: "Hades",
    choice2: "Poseidon",
    choice3: "Zeus",
    choice4: "Apollo",
    answer: 3
  }
];


//CONSTANTS
//CONSTANTS
const INCORRECT_TAX =3;
const MAX_QUESTIONS = 15;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();