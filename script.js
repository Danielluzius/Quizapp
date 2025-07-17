function init() {
  questionCount();
}

function questionCount() {
  document.getElementById('all_questions').innerHTML = questions.length;

  showCurrentQuestion();
}

let right_answer = 0;
let currentQuestion = 0;
let AUDIO_CORRECT = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/fail.mp3');

function showCurrentQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    upgradeProgressBar();
    showNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById('quiz_end_message').style.display = 'block';
  document.getElementById('quiz_start').style.display = 'none';

  document.getElementById('total_questions').innerHTML = questions.length;
  document.getElementById('correct_answers').innerHTML = right_answer;
}

function upgradeProgressBar() {
  let percent = currentQuestion / questions.length;
  percent = Math.round(percent * 100);

  document.getElementById('progress_bar').innerHTML = `${percent}%`;
  document.getElementById('progress_bar').style.width = `${percent}%`;
}

function showNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById('current_question_number').innerHTML = currentQuestion + 1;
  document.getElementById('question_text').innerHTML = question.question;
  document.getElementById('answer_1').innerHTML = question['answers_1'];
  document.getElementById('answer_2').innerHTML = question['answers_2'];
  document.getElementById('answer_3').innerHTML = question['answers_3'];
  document.getElementById('answer_4').innerHTML = question['answers_4'];
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question['right_answer']}`;

  if (rightAnswerSelected(selectedQuestionNumber, question)) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    AUDIO_CORRECT.play();
    right_answer++;
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_WRONG.play();
  }
  document.getElementById('next_button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
  currentQuestion++;
  showCurrentQuestion();
  document.getElementById('next_button').disabled = true;
  resetAnswerButtons();
}

function resetAnswerButtons() {
  document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-danger');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-danger');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-danger');
  document.getElementById('answer_4').parentNode.classList.remove('bg-success', 'bg-danger');
}

function restartGame() {
  currentQuestion = 0;
  right_answer = 0;
  document.getElementById('quiz_end_message').style.display = 'none';
  document.getElementById('quiz_start').style.display = 'block';
  document.getElementById('next_button').disabled = true;
  resetAnswerButtons();
  showCurrentQuestion();
}
