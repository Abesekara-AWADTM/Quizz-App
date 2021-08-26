const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById('progressText');
const scoreText=document.getElementById('score');
const progressbarfull=document.getElementById("progressbarfull");
 const loader=document.getElementById("loader");
 const game=document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availbleQuestions = [];


let questions = [];

fetch(
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
  .then((res) => {
      return res.json();
  })
  .then((loadedQuestions) => {
      questions = loadedQuestions.results.map((loadedQuestion) => {
          const formattedQuestion = {
              question: loadedQuestion.question,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
          );

          answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
          });

          return formattedQuestion;
      });

      startGame();
  })
  .catch((err) => {
      console.error(err);
  });




const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
   game.classList.remove('hidden');
   loader.classList.add("hidden")
};

getNewQuestion = () => {
   if(availbleQuestions.length === 0 || questionCounter>=MAX_QUESTIONS){
     localStorage.setItem('mostRecentScore',score)
     return window.location.assign('/end.html');
   }

  questionCounter++;

  progressText.innerText= `Question ${questionCounter}/${MAX_QUESTIONS}`;

  progressbarfull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice)=> {
    const number = choice.dataset['number'];
    choice.innerHTML = currentQuestion['choice' + number];
  });

  availbleQuestions.splice(questionIndex,1);
  acceptingAnswers = true;
};


  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedchoice = e.target;
      const selectedAnswer = selectedchoice.dataset['number'];

      const classToApply =
      selectedAnswer==currentQuestion.answer? 'correct':'incorrect';

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


  incrementScore = (num)=>{
    score+=num;
    scoreText.innerText=score;
  };

startGame();
