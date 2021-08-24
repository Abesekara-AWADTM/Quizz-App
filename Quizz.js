const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const progressText=document.getElementById('progressText');
const scoreText=document.getElementById('score');
 
const progressbarfull=document.getElementById("progressbarfull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availbleQuestions = [];


let questions = [
  {
    question: " Which feature of OOPS derives the class from another class? ",
    choice1: " Inheritance ",
    choice2: " Data hiding ",
    choice3: " Encapsulation ",
    choice4: " Polymorphism ",
    answer: 1,
  },
  {
    question: " Which two features of object-oriented programming are the same? ",
    choice1: " Abstraction and Polymorphism features are the same ",
    choice2: " Inheritance and Encapsulation features are the same ",
    choice3: " Encapsulation and Polymorphism features are the same ",
    choice4: " Encapsulation and Polymorphism features are the same ",
    answer: 4,
  },
  {
    question: " Which class cannot create its instance? ",
    choice1: " Parent class ",
    choice2: " Abstract class ",
    choice3: " Anonymous class ",
    choice4: " Nested class ",
    answer: 2,
  },

  {
    question: " which feature of OOP encorages the code reusability ",
    choice1: " Abstraction ",
    choice2: " Polymorphism ",
    choice3: " Inheritance ",
    choice4: " Encapsulation ",
    answer: 3,
  },
  {
    question: " Which keyword is used to inherit a class in Java? ",
    choice1: "  inherit ",
    choice2: " implement ",
    choice3: " extend ",
    choice4: " extends",
    answer: 4,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  // availableQuestions=Questions;

  getNewQuestion();
};

getNewQuestion = () => {
   if(availbleQuestions.length === 0 || questionCounter >MAX_QUESTIONS){
     return window.location.assign('/end.html');
   }

  questionCounter++;
  progressText.innerText= `Question ${questionCounter}/${MAX_QUESTIONS}`;

  progressbarfull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availbleQuestions.splice(questionIndex,1);
  acceptingAnswers = true;
};

  choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedchoice = e.target;
      const selectedAnswer = selectedchoice.dataset["number"];

      const classToApply =selectedAnswer==currentQuestion.answer? 'correct':'incorrect';

      if(classToApply==='correct'){ 
        incrementScore(CORRECT_BONUS);
      }

      selectedchoice.parentElement.classList.add(classToApply);

      setTimeout(()=>{
        selectedchoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      },1000 );
    });
  });
  incrementScore = num=>{
    score+=num;
    scoreText.innerText=score;
  }

startGame();
