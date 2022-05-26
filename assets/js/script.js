
// Global variable assignment
    
var startBtn = document.getElementById('startBtn');
var submitBtn = document.getElementById('submitBtn');
var textBox = document.getElementById('textBox');
var questionBox = document.getElementById('questionBox');
var ansBtn = document.getElementById('ansBtn');
var answerCorrect = document.getElementById('correct');
var answerWrong = document.getElementById('wrong');
var goBackBtn = document.getElementById('goBackBtn');
var clearBtn = document.getElementById('clearBtn');
var submitFormEl = document.getElementById('submitForm');
var scoreEl = document.getElementById('scoreInfo');
var highScoreEl = document.getElementById('highScore');
var timeEl = document.getElementById('timerCount');
var initials = document.getElementById('initials');
var scoreList = document.getElementById('scoreList');
var currentQuestion;
var remainingTime = 60;
var timerInterval;

startBtn.addEventListener("click", startQuiz)


// Questions and answer choices

var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: [
      {text: '1. strings', correct: false},
      {text: '2. booleans', correct: false},
      {text: '3. alerts', correct: true},
      {text: '4. numbers', correct: false}
    ],
  }, 
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: [
      {text: '1. quotes', correct: false},
      {text: '2. curly brackets', correct: false},
      {text: '3. parentheses', correct: true},
      {text: '4. sqaure brackets', correct: false}
    ],
  }, 
  {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: [
      {text: '1. numbers and strings', correct: false},
      {text: '2. other arrays', correct: false},
      {text: '3. booleans', correct: false},
      {text: '4. all of the above', correct: true}
    ],
  }, 
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: [
      {text: '1. commas', correct: false},
      {text: '2. curly brackets', correct: false},
      {text: '3. quotes', correct: true},
      {text: '4. parentheses', correct: false}
    ],
  }, 
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      {text: '1. JavaScript', correct: false},
      {text: '2. terminal / bash', correct: false},
      {text: '3. for loops', correct: false},
      {text: '4. console.log', correct: true}
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: [
      {text: '<javascript>', correct: false},
      {text: '<js>', correct: false},
      {text: '<script>', correct: true},
      {text: '<scripting>', correct: false}
    ],
  }, 
  {
    question: "How to write an IF statement in JavaScript?",
    choices: [
      {text: 'if i =5 then', correct: false},
      {text: 'if (i == 5)', correct: true},
      {text: 'if i = 5', correct: false},
      {text: 'if i ==5 then', correct: false}
    ],
  }
];

// Set the timer

function setTime() {
  timerInterval = setInterval(function() {
    remainingTime--;
    timeEl.textContent = remainingTime;

    if(remainingTime === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      openSubmitForm();
    }
  }, 1000);
}

//Show question

function showQuestion(quiz){
  questionBox.innerText = quiz.question;
  for(var i = 0; i < quiz.choices.length; i++) {
    var button = document.createElement('button');
    button.innerText = quiz.choices[i].text;
    button.classList.add('button');
    if(quiz.choices[i].correct) {
      button.dataset.correct = quiz.choices[i].correct;
      console.log(button.dataset.correct);
    }
    button.addEventListener('click', userSelection)
    ansBtn.appendChild(button);
  };
}

//Prompt the next question
function nextQuestion() {
  showQuestion(quizQuestions[currentQuestion]);
  currentQuestion++;
}

//Start the quiz
function startQuiz() {
  startBtn.classList.add('hide');
  textBox.classList.add('hide');
  questionBox.classList.remove('hide');
  ansBtn.classList.remove('hide');
  currentQuestion = 0;
  setTime();
  nextQuestion();
}

//User selection

function userSelection(event){
  var selectBtn = event.target;
  answerCorrect.classList.add('hide');
  answerWrong.classList.add('hide');
  var selectAns = selectBtn.dataset.correct;
  if (selectAns) {
    answerCorrect.classList.remove('hide');
    while (ansBtn.firstChild) {
      ansBtn.removeChild(ansBtn.firstChild);
    }
  } else {
    answerWrong.classList.remove('hide');
    remainingTime = remainingTime - 5;
    while (ansBtn.firstChild) {
      ansBtn.removeChild(ansBtn.firstChild);
    }
  }
  if (quizQuestions.length > currentQuestion){
    nextQuestion();
  } else {
    clearInterval(timerInterval);
    openSubmitForm();
  }
}

// Submit form

function openSubmitForm() {
  questionBox.classList.add('hide');
  ansBtn.classList.add('hide');
  startBtn.classList.add('hide');
  textBox.classList.add('hide');
  submitFormEl.classList.remove('hide');
  document.querySelector(".scoreInfo").textContent = 'Your Final Score is ' + remainingTime;
  
}

// Clear answer

function clearEl() {
  answerWrong.classList.add('hide');
  answerCorrect.classList.add('hide');
  
}

//Local storage

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  highScoreEl.classList.remove('hide');
  submitFormEl.classList.add('hide');
  var user = {
    initialsName: initials.value.trim(),
    score: remainingTime
  };
  initials.value='';
  localStorage.setItem("score", JSON.stringify(user));
  var scoreEl = JSON.parse(localStorage.getItem("score"));
  if (scoreEl !== null) {
    var winner = document.createElement('li');
    winner.innerText = scoreEl.initialsName + " - " + scoreEl.score;
    scoreList.appendChild(winner);
  }

})

//Go back

goBackBtn.addEventListener("click", function(){
  startBtn.classList.remove('hide');
  textBox.classList.remove('hide');
  highScoreEl.classList.add('hide');
  clearInterval(timerInterval);
  remainingTime = 60;
  timeEl.textContent = remainingTime;
});


//Clear score

clearBtn.addEventListener("click", function(){
  while (scoreList.childElementCount > 0) {
    scoreList.removeChild(scoreList.lastChild);
  }
});

//View score button

function viewScoreBtn(){
  highScoreEl.classList.remove('hide');
  startBtn.classList.add('hide');
  textBox.classList.add('hide');
  submitFormEl.classList.add('hide');
  questionBox.classList.add('hide');
  ansBtn.classList.add('hide');
}