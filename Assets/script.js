var formInputEl = document.querySelector('#form');
var displayedTimer = document.querySelector('#timer');
var quizStartScreen = document.querySelector('#quizstartscreen');
var savedscores = document.querySelector("#highscores");
var quizTime = 120;
var currentQuestion = -1;
var highScores = [];
var score = 0;
var startbtn = document.getElementById("btn");
startbtn.addEventListener("click", function(event) {
  event.preventDefault();
  console.log('Started')

  timerFunc()
  startQuiz()
})

function timerFunc() {
  timerId = setInterval(function() {
    displayedTimer.textContent = ('Time remaining: ' + quizTime);
    quizTime--;
    if (quizTime <= 0) {
      clearInterval(timerId);
      document.getElementById('timer').style.visibility='hidden';
      endOfQuiz();
    }
  }, 1000);
}

function startQuiz() {
  document.getElementById('btn').style.visibility='hidden';
  document.getElementById('text').style.visibility='hidden';
  currentQuestion++;
  score = 0;
  showQuestion();
};

// Define the quiz questions and answers
const quizQuestions = [
  {
    question: 'What does CSS stand for?',
    answers: [
      'Computer Styling Software',
      'Computer Screen Styling',
      'Central Software System',
      'Cascading Style Sheets', 
    ],
    correct: 'Cascading Style Sheets'
  },

  {
    question: 'Which of the following is not an API type?',
    answers: [
      'public',
      'private',
      'composite',
      'regulatory', 
    ],
    correct: 'regulatory'
  },

  {
    question: 'In the statement "var Apple=47;" what is "Apple"?',
    answers: [
      'Variable name',
      'Value',
      'event listener',
      'Fruit', 
    ],
    correct: 'Variable name'
  },

  {
    question: 'What does HTML stand for?',
    answers: [
      'Hot Typing MoneyLine',
      'High Tension Megabyte Language',
      'HyperText Markup Language',
      'nothing', 
    ],
    correct: 'HyperText Markup Language'
  },

  {
    question: 'What is Var used for?',
    answers: [
      'empty a <div> tag',
      'to store information to be referenced and manipulated',
      'tomorrow',
      'empty a local storage', 
    ],
    correct: 'to store information to be referenced and manipulated'
  },
];

function showQuestion() {
  var question = quizQuestions[currentQuestion];
  console.log(question)
  var question1 = question.question
  console.log(question1)
  $('#cardheader').text(question1);
  $('#answers').empty();
  var correctPick = question.correct
  for (var i = 0; i <question.answers.length; i++) {
    console.log(question)  
    var answerBtn = $('<button>', {
      text: question.answers[i],
      click: function () {
        displayNextQuestion()
        grader($(this),correctPick)
      }
    })
    $('#answers').append(answerBtn);
  };
};

function grader(clickedButton, correctPick) {
  var answerChoice = clickedButton.text();
  var correctChoice = correctPick;
  if (answerChoice ===correctChoice) {
    score++
  }
  else {
    timeLeft -= 10;
  }
}

function displayNextQuestion() {
  currentQuestion ++;
  console.log(currentQuestion)
  if (currentQuestion > 4){
    endOfGame()
  }
  else {
    console.log(currentQuestion)
    var questionBlank = quizQuestions[currentQuestion];
    var thisQuestion = questionBlank.question
    console.log(thisQuestion)
    $('#cardheader').text(thisQuestion);
    $('#answers').empty();
    var correctPick = questionBlank.correct
    for (var i = 0; i <questionBlank.answers.length; i++) {
      console.log(currentQuestion)  
      var answerBtn = $('<button>', {
        text: questionBlank.answers[i],
        id: "option",
        click: function () {
          displayNextQuestion()
          grader($(this), correctPick);
        }
      })
      $('#answers').append(answerBtn);
    };
  }
}

function endOfGame () {
  finalScore = score + quizTime;
  console.log(finalScore)
  //calculate score and make it a var to go into header
  document.getElementById('option').style.visibility='hidden';
  document.getElementById('timer').style.visibility='hidden';
  $('#answers').empty();
  $('#cardheader').text('You have completed the quiz! your score is :' + finalScore);
  //ending text
  $('#text').text('Enter your initials below to save your score.');
  //create form
  var initialsForm = $('<input>', {
    type: 'text',
    id: 'initials-input',
    name: 'form',
  })
  $('#form').append(initialsForm);
  //create submit button(onclick it saves to local storage array)
  var submitBtn = $('<button>', {
    text: "Submit",
    click: function () {
    // add Final score and initials to localstorage
    saveScore(finalScore)
    displayHighscores()  
    }
  })
  submitBtn.on('click', function(event) {
    event.preventDefault();
    saveScore();
  });
  $('#answers').append(submitBtn);
}
  
function saveScore(value) {
  var initialsInput = document.querySelector('#initials-input');
  var userInitials = initialsInput.value;
  let scoreObj = {
    name: userInitials,
    value: value
  };
  highScores.push(scoreObj);
  localStorage.setItem('scores', JSON.stringify(highScores));
}

function displayHighscores() {
  // Clear highscores and update with new score by user
  $(savedscores).empty();
  // Render a new li for high score
  for (var i = 0; i < highScores.length; i++) {
    var initials = highScores[i].name;
    var score = highScores[i].value;

    var newscores = $('<li>')
      .text(initials + ' Score:' +score)
      .addClass('li')
    $(savedscores).append(newscores);
  }
}