function init() {
  questionCount();
}

function questionCount() {
  document.getElementById('all_questions').innerHTML = questions.length;

  showCurrentQuestion();
}

let right_answer = 0;
let currentQuestion = 0;

function showCurrentQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById('quiz_end_message').style.display = 'block';
    document.getElementById('quiz_start').style.display = 'none';

    document.getElementById('total_questions').innerHTML = questions.length;
    document.getElementById('correct_answers').innerHTML = right_answer;
  } else {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress_bar').innerHTML = `${percent}%`;
    document.getElementById('progress_bar').style.width = `${percent}%`;

    let question = questions[currentQuestion];

    document.getElementById('current_question_number').innerHTML = currentQuestion + 1;
    document.getElementById('question_text').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question['answers_1'];
    document.getElementById('answer_2').innerHTML = question['answers_2'];
    document.getElementById('answer_3').innerHTML = question['answers_3'];
    document.getElementById('answer_4').innerHTML = question['answers_4'];
  }
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question['right_answer']}`;

  if (selectedQuestionNumber == question['right_answer']) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    right_answer++;
  } else {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
  }
  document.getElementById('next_button').disabled = false;
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
