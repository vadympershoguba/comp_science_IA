let test = null;
let questionIndex = 0;

class Answers {
  constructor() {
    this.answers = [];
    this.username = '';
  }

  addAnswer(question_id, username, type, answer) {
    const answerInfo = new Answer(question_id, username, type, answer);
    this.answers.push(answerInfo);
  }
}

class Answer {
  constructor(question_id, username, type, answer) {
    this.question_id = question_id;
    this.username = username;
    this.type = type;
    this.answer = answer;
  }
}

const answers = new Answers()

document.getElementById('joinSessionButton').addEventListener('click', ()=>{
    fetch('/joinUserToSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            code: document.getElementById('joinSessionCode').value
        }),
      })
      .then(response => response.json())
      .then(data => {
        joinSessionCodeBox.style.display = 'none';
        joinEnterUsername.style.display = 'block';
        test = data
      })
})

document.getElementById('joinGetUsernameStart').addEventListener('click', ()=>{
  console.log(test)
  joinQuestionDraw.style.display = 'block'
  const questionType = test.test[questionIndex].type
  localStorage.setItem('username', joinGetUsername.value);
  joinEnterUsername.style.display = 'none';
  if (questionType == 'multipleChoice') {
    drawMultipleChoice(questionIndex);
  } else if (questionType == "trueFalse"){
    drawTrueFalse(questionIndex)
  } else if (questionType == 'openAnswer'){
    drawOpenAnswer(questionIndex)
  }
  questionIndex++
})

document.getElementById('joinNextButton').addEventListener('click', ()=>{
    saveAnswer()
    clearQuestion()
    Array.from(document.getElementsByClassName('joinOptionTextMultipleChoise')).map(input => input.value = '');
    joinMCQuestion.textContent = ''
    const questionType = test.test[questionIndex].type
    if (questionType == 'multipleChoice') {
      drawMultipleChoice(questionIndex);
    } else if (questionType == 'trueFalse'){
      drawTrueFalse(questionIndex)
    } else if (questionType == 'openAnswer'){
      drawOpenAnswer(questionIndex)
    }
    questionIndex++;
    if (questionIndex == test.test.length){
      joinNextButton.style.display = 'none'
      joinFinishTestButton.style.display = 'block'
    }
})

function clearQuestion(){
  option1.value = '';
  option2.value = '';
  option3.value = '';
  option4.value = '';

  checkbox1.style.backgroundColor = 'white'
  checkbox1.value = 0
  checkbox2.style.backgroundColor = 'white'
  checkbox2.value = 0
  checkbox3.style.backgroundColor = 'white'
  checkbox3.value = 0
  checkbox4.style.backgroundColor = 'white'
  checkbox4.value = 0

  joinOpenAnswerText.value = '';

  joinTrueFalseCheck1.style.backgroundColor = 'white'
  joinTrueFalseCheck1.value = 0
  joinTrueFalseCheck2.style.backgroundColor = 'white'
  joinTrueFalseCheck2.value = 0

}

function saveAnswer() {
  let answer;
  if (test.test[questionIndex-1].type == 'multipleChoice'){
    answer = [checkbox1.value, checkbox2.value, checkbox3.value, checkbox4.value]
  }else if (test.test[questionIndex-1].type == 'trueFalse'){
    answer = [joinTrueFalseCheck1.value, joinTrueFalseCheck2.value]
  }else if (test.test[questionIndex-1].type == 'openAnswer'){
    answer = joinOpenAnswerText.value
  }
  answers.addAnswer(test.test[questionIndex-1].question_id, localStorage.getItem('username'), test.test[questionIndex-1].type, answer)
}

function drawOpenAnswer(index){
  joinMCQuestion.textContent = test.test[index].question;
  joinQuestionDraw.style.height = '400px'
  joinOpenAnswerDraw.style.display = 'block'
  joinMulptileChoiceDraw.style.display = 'none';
  joinTrueFalseDraw.style.display = 'none'
  joinNextButton.style.top = '410px'
}

function drawTrueFalse(index){
  joinQuestionDraw.style.height = '240px'
  joinNextButton.style.top = '250px'
  joinMCQuestion.textContent = test.test[index].question;
  joinOpenAnswerDraw.style.display = 'none'
  joinMulptileChoiceDraw.style.display = 'none';
  joinTrueFalseDraw.style.display = 'block'
}

function drawMultipleChoice(index){
  joinQuestionDraw.style.height = '400px'
  joinOpenAnswerDraw.style.display = 'none'
  joinMulptileChoiceDraw.style.display = 'block';
  joinTrueFalseDraw.style.display = 'none'
    joinMCQuestion.textContent = test.test[index].question;
    inputs = Array.from(document.getElementsByClassName('joinOptionTextMultipleChoise'));
    for (let i = 0; i < inputs.length; i++){
      inputs[i].value = test.test[index].options.split(',')[i];
    }
}

document.getElementById('checkbox1').addEventListener('click', ()=>{
    document.getElementById('checkbox1').style.backgroundColor = document.getElementById('checkbox1').value == 0 ? 'green' : 'white';
    document.getElementById('checkbox1').value = document.getElementById('checkbox1').value == 0 ? 1 : 0;
  });
  
  document.getElementById('checkbox2').addEventListener('click', ()=>{
    document.getElementById('checkbox2').style.backgroundColor = document.getElementById('checkbox2').value == 0 ? 'green' : 'white';
    document.getElementById('checkbox2').value = document.getElementById('checkbox2').value == 0 ? 1 : 0;
  });
  
  document.getElementById('checkbox3').addEventListener('click', ()=>{
    document.getElementById('checkbox3').style.backgroundColor = document.getElementById('checkbox3').value == 0 ? 'green' : 'white';
    document.getElementById('checkbox3').value = document.getElementById('checkbox3').value == 0 ? 1 : 0;
  });
  
  document.getElementById('checkbox4').addEventListener('click', ()=>{
    document.getElementById('checkbox4').style.backgroundColor = document.getElementById('checkbox4').value == 0 ? 'green' : 'white';
    document.getElementById('checkbox4').value = document.getElementById('checkbox4').value == 0 ? 1 : 0;
  });

  document.getElementById('joinTrueFalseCheck1').addEventListener('click', ()=>{
    document.getElementById('joinTrueFalseCheck1').style.backgroundColor = document.getElementById('joinTrueFalseCheck1').value == 0 ? 'green' : 'white';
    document.getElementById('joinTrueFalseCheck1').value = document.getElementById('joinTrueFalseCheck1').value == 0 ? 1 : 0;
  });
  
  document.getElementById('joinTrueFalseCheck2').addEventListener('click', ()=>{
    document.getElementById('joinTrueFalseCheck2').style.backgroundColor = document.getElementById('joinTrueFalseCheck2').value == 0 ? 'green' : 'white';
    document.getElementById('joinTrueFalseCheck2').value = document.getElementById('joinTrueFalseCheck2').value == 0 ? 1 : 0;
  })

document.getElementById('joinFinishTestButton').addEventListener('click', ()=>{
  saveAnswer()
  joinQuestionDraw.style.display = 'none';
  alert('You finished your test!')
  getResultsButton.style.display = 'block'
  console.log(answers)
  console.log(test)
  fetch('/saveAnswers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        answer: answers,
        username: localStorage.getItem("username"),
        session_id: document.getElementById('joinSessionCode').value 
    }),
  })
  .then(response => response.json())
  .then(data => {})
});

document.getElementById('getResultsButton').addEventListener('click', ()=>{
  fetch('/getResults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: localStorage.getItem("username"),
        session_id: document.getElementById('joinSessionCode').value 
    }),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.data)
  })
})


