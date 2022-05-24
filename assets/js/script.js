// function setTime() {
//     var timerInterval 
// }

import questions from './questions'


var level1 = require('./questions.js');
console.log(level1);

var time = questions.length;
var currentQuestionIndex = 0;
var question = document.getElementById("question")
var title = document.getElementById("title")
var submitButton = document.getElementById("submitButton")
var startButton = document.getElementById("startButton")

console.log(time);

function getQuestion() {
    var currentQuestion = questions(currentQuestionIndex);
    var titleEl = document.getElementById("title");
    titleEl.textContent = currentQuestion.title;
    console.log(currentQuestion);

}

getQuestion();

function startQuiz() {
    var startScreen = document.getElementById("startScreen");
    startScreen.setAttribute('class', 'hide');
    startScreen.removeAttribute('class');

    timer = setInterval(10000);
    timerEL.textContent = time;
}

startQuiz();

startScreen();

startButton.onclick = startQuiz;