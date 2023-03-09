var displayedTimer = document.querySelector('#timer');
var quizStartScreen = document.querySelector('#quizstartscreen');
var savedscores = document.querySelector("#highscores");
var quizTime = 120;
var highScores = [];
var currentQuestion = 0;

var startbtn = document.getElementById("btn");
startbtn.addEventListener("click", function(event) {
  event.preventDefault();
  console.log('Started')

  timerFunc()
  startQuiz()
})

function timerFunc() {
  timerId = setInterval(timerFunc, 1000)
  displayedTimer.textContent = quizTime;
  quizTime--;
  displayedTimer.textContent = ('Time remaining:'+ quizTime);
}

function startQuiz() {
  var quizStartScreen = document.querySelector('#quizstartscreen');
  document.getElementById('btn').style.visibility='hidden';
  document.getElementById('text').style.visibility='hidden';
  currentQuestion = 0;
  score = 0;
  showQuestion();
};

// Define the quiz questions and answers
const quizQuestions = [
  {
    question: 'What does blank mean?',
    answers: [
      'not blank',
      'definietly not blank',
      'blank',
      '7', 
    ],
    correct: 'blank'
  },

  {
    question: 'What day is it?',
    answers: [
      'not today',
      'yesterday',
      'tomorrow',
      'today', 
    ],
    correct: 'today'
  },
];

function showQuestion() {
  var question = quizQuestions[currentQuestion];
  console.log(question)
  var question1 = question.question
  console.log(question1)
  $('#cardheader').text(question1);
  $('#answers').empty();
  for (var i = 0; i <question.answers.length; i++) {
      var answerBtn = $('<button>', {
      text: question.answers[i],
      click: function () {
        
      }
    })
    $('#answers').append(answerBtn);
  };
};

function displayNextQuestion() {

}

function endOfGame () {

}
  
function displayHighscores() {
  // Clear highscores and update with new score by user
  savedscores.innerHTML = "";
  // Render a new li for high score
  for (var i = 0; i < highScores.length; i++) {
    var initials = highScores[i];
    var score = highScores[i].value;

    var newscores = $('<li>')
      .text(initials + ' Score:' +score)
      .addClass('li')
    savedscores.appendChild(newscores);
  }
}