
document.getElementById('signUpButton').addEventListener('click', ()=>{
    document.getElementById('signUpBox').style.display = 'block'
    document.getElementById('body').style.filter = 'blur(5px)'
});
testName = null


document.getElementById('signUpBoxBack').addEventListener('click', ()=>{
    document.getElementById('signUpBox').style.display = 'none'
    document.getElementById('body').style.filter = 'blur(0px)'
});

document.addEventListener("DOMContentLoaded", ()=>{
  username = localStorage.getItem("username");
  if (username.length >= 4 && username != 'null') {
    document.getElementById('usernameText').style.display = 'block'
    document.getElementById('usernameText').innerHTML = username;
    document.getElementById('signUpButton').style.display = 'none'
    document.getElementById('logInBUtton').style.display = 'none'
    signOutButton.style.display = 'block'
  }
  fetch('/getUserTests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: localStorage.getItem('username')
    }),
  })
  .then(response => response.json())
  .then(data => {
    data = Array.from(data.data);
    console.log(data)
      for (let i = 0; i < data.length; i++) {
        createTestNameButton(data[i], i)
      }
  })
});
let toppp = 420
function createTestNameButton (name, index) {
  const button = document.createElement('button');
  button.classList = ('testButton')
  button.id = `testButton${index}`
  button.textContent = name.test_name
  button.style.top = `${toppp}px`
  toppp += 80
  menuBox.appendChild(button)
}

document.getElementById('signUpBoxButton').addEventListener('click', ()=>{
    fetch('/signUpUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('signUpUsernameInput').value,
            password: document.getElementById('signUpPasswordInput').value
        }),
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message)
        if (data.message == "You have successfully signed up!") {
          signOutButton.style.display = 'block'
          document.getElementById('signUpBox').style.display = 'none'
          document.getElementById('body').style.filter = 'blur(0px)'
          document.getElementById('usernameText').style.display = 'block'
          document.getElementById('usernameText').innerHTML = document.getElementById('signUpUsernameInput').value;
          document.getElementById('signUpButton').style.display = 'none'
          document.getElementById('logInBUtton').style.display = 'none'
          localStorage.setItem("username", document.getElementById('signUpUsernameInput').value);
        }
      })
}); 

document.getElementById('createNewTestButton').addEventListener('click', ()=>{
  document.getElementById('menuBox').style.display = 'none';
  document.getElementById('creationBox').style.display = 'block';
});

class Test {
  constructor() {
    this.questions = [];
    this.name = '';
    this.complexity = '';
    this.topic = '';
  }

  addQuestion(question, type, options, answer) {
    const questionInfo = new Question(question, type, options, answer);
    this.questions.push(questionInfo);
  }
}

const test = new Test(giveId(), 0)

class Question {
  constructor(question, type, options, answer) {
    this.question = question;
    this.type = type;
    this.options = options;
    this.answer = answer;
  }
}

let marginnn = 10
let activeButton = 'questionItem1'
let prevButton = 'questionItem1'

document.getElementById('addQuestionButton').addEventListener('click', ()=>{
    if (checkEmpty() == true){
        alert('You need to make the question completely.')
    }else{
        prevButton = activeButton;
        //save question properties
        let answers = Array.from(document.getElementsByClassName('checkMultipleChoise')).map(input => input.value)
        let tfAnswers = Array.from(document.getElementsByClassName('checkTrueFalseChoise')).map(input=>input.value)
        if (typeOfQuestion.value == 'multipleChoice') {
        test.addQuestion(inputText.value, typeOfQuestion.value, [option1.value, option2.value, option3.value, option4.value], answers)
        }else if (typeOfQuestion.value == 'trueFalse'){
        test.addQuestion(inputText.value, typeOfQuestion.value, ['True', 'False'], tfAnswers)
        }else if (typeOfQuestion.value == 'openAnswer'){
        test.addQuestion(inputText.value, typeOfQuestion.value, [], [])
        }
        emptyLines()
        const questionNumbers = Array.from(document.getElementsByClassName('questonListItem'))
        //create new button
        let button = document.createElement('button')
        button.classList = 'questonListItem'
        button.style.border = '5px solid black'
        button.style.marginLeft = `${marginnn + 80}px`
        marginnn+= 80;
        button.id = `questionItem${questionNumbers.length+1}`
        button.textContent = questionNumbers.length+1
        activeButton = button.id
        questionsList.appendChild(button)
        //make previous button with simple border
        document.getElementById(prevButton).style.border = '1px solid black'
        //add Onclick function for created button
        button.onclick = () => {
            prevButton = activeButton
            activeButton = button.id
            button.style.border = '5px solid black';
            document.getElementById(prevButton).style.border = '1px solid black'
            openQuestion(button);
        };
    }
});

function checkEmpty(){
    if (typeOfQuestion.value == 'multipleChoice') {
            return checkMultipleChoise()
        }else if (typeOfQuestion.value == 'trueFalse'){
            return checkTrueFalse()
        }else if (typeOfQuestion.value == 'openAnswer'){
            return checkOpenAnswer()
        }
    function checkMultipleChoise(){
        if (inputText.value != '' && option1.value != '' && option2.value != '' && option3.value != '' && option4.value != '' && (checkbox1.value == 1 || checkbox2.value == 1 || checkbox3.value == 1 || checkbox4.value == 1)){
            return false;
        }
        else {
            return true
        }
    }

    function checkTrueFalse(){
        if (inputText.value != '' && (trueFalseCheck1.value == 1 || trueFalseCheck2.value == 1)) {
            return false;
        } else {
            return true
        }
    }

    function checkOpenAnswer(){
        if (inputText.value != '' && openAnswerText.value != ''){
            return false
        } else{
            return true
        }
    }
}

function openQuestion(button){
  const index = +button.textContent
  let question = test.questions[index-1]
  console.log(question)
  if (question == undefined) {
    emptyLines()
  }
  else if (question.type == 'multipleChoice'){
    showMCQuestion(question)
  }
  else if (question.type == 'trueFalse'){
    showTFQUestion(question)
  }
  else if (question.type == 'openAnswer'){
    showOAQuestion(question)
  }
}

function showOAQuestion(question){
typeOfQuestion.value = 'openAnswer'
  multipleChoiceDiv.style.display = 'none';
  trueFalseDiv.style.display = 'none';
  openAnswerDiv.style.display = 'block'
  //show question
  inputText.value = question.question;
}

function showTFQUestion(question){
  typeOfQuestion.value = 'trueFalse'
  multipleChoiceDiv.style.display = 'none';
  trueFalseDiv.style.display = 'block';
  openAnswerDiv.style.display = 'none'
  //show question
  inputText.value = question.question;
  //show correct answers
  trueFalseCheck1.style.backgroundColor = question.answer[0] == '1' ? 'green' : 'white';
  trueFalseCheck2.style.backgroundColor = question.answer[1] == '1' ? 'green' : 'white';
  //show options
  trueText.value = question.options[0];
  falseText.value = question.options[1];
}

function showMCQuestion(question){
  alert(question)
  typeOfQuestion.value = 'multipleChoice'
  multipleChoiceDiv.style.display = 'block';
  trueFalseDiv.style.display = 'none';
  openAnswerDiv.style.display = 'none'
  //show question
  inputText.value = question.question;
  //show correct answers
  checkbox1.style.backgroundColor = question.answer[0] == '1' ? 'green' : 'white';
  checkbox2.style.backgroundColor = question.answer[1] == '1' ? 'green' : 'white';
  checkbox3.style.backgroundColor = question.answer[2] == '1' ? 'green' : 'white';
  checkbox4.style.backgroundColor = question.answer[3] == '1' ? 'green' : 'white';
  //show answer options
  option1.value = question.options[0]
  option2.value = question.options[1]
  option3.value = question.options[2]
  option4.value = question.options[3]
}

function emptyLines() {
  inputText.value = '';

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

  openAnswerText.value = '';

  trueFalseCheck1.style.backgroundColor = 'white'
  trueFalseCheck1.value = 0
  trueFalseCheck2.style.backgroundColor = 'white'
  trueFalseCheck2.value = 0

  trueText.value = '';
  falseText.value = '';
}

function giveId () {
  const min = 1;
  const max = 1000000000000000000000000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

document.getElementById('typeOfQuestion').addEventListener('change', ()=>{
  if (typeOfQuestion.value == 'openAnswer') {
    multipleChoiceDiv.style.display = 'none';
    openAnswerDiv.style.display = 'block';
    trueFalseDiv.style.display = 'none'
  }
  else if (typeOfQuestion.value == 'multipleChoice') {
    multipleChoiceDiv.style.display = 'block';
    openAnswerDiv.style.display = 'none';
    trueFalseDiv.style.display = 'none'
  }
  else if (typeOfQuestion.value == 'trueFalse') {
    multipleChoiceDiv.style.display = 'none';
    openAnswerDiv.style.display = 'none';
    trueFalseDiv.style.display = 'block'
  }
});

document.getElementById('trueFalseCheck1').addEventListener('click', ()=>{
  document.getElementById('trueFalseCheck1').style.backgroundColor = document.getElementById('trueFalseCheck1').value == 0 ? 'green' : 'white';
  document.getElementById('trueFalseCheck1').value = document.getElementById('trueFalseCheck1').value == 0 ? 1 : 0;
});

document.getElementById('trueFalseCheck2').addEventListener('click', ()=>{
  document.getElementById('trueFalseCheck2').style.backgroundColor = document.getElementById('trueFalseCheck2').value == 0 ? 'green' : 'white';
  document.getElementById('trueFalseCheck2').value = document.getElementById('trueFalseCheck2').value == 0 ? 1 : 0;
})

questionItem1.addEventListener('click', ()=>{
  prevButton = activeButton
  activeButton = 'questionItem1'
  questionItem1.style.border = '5px solid black';
  document.getElementById(prevButton).style.border = '1px solid black'
  openQuestion(questionItem1);
})

document.getElementById('saveTheTest').addEventListener('click', ()=>{
  test.complexity = testComplexity.value;
  test.name = document.getElementById('testName').value;
  test.topic = testTopic.value;
  fetch('/saveTest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        test: test,
        username: localStorage.getItem("username")
    }),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    document.getElementById('menuBox').style.display = 'block';
    document.getElementById('creationBox').style.display = 'none';
    location.reload()
  })
})
/*
test.addQuestion('Here is the first (1st) question?', 'Multiple Choice', ['option1', 'option2', 'option3', 'option4'], [0, 1, 1, 0])
test.addQuestion('Here is the second (2nd) question?', 'True or False', [], [1, 0])
test.addQuestion('Here is the third (3rd) question?', 'Open answer', [], [])
test.addQuestion('Here is the fourth (4th) question?', 'Multiple Choice', ['option___1', 'option___2', 'option___3', 'option___4'], [1, 0, 1, 0])
test.addQuestion('Here is the fifth (5th) question?', 'True or False', [], [0, 1])
test.addQuestion('Here is the sixth (6th) question?', 'Open answer', [], [])
*/
document.getElementById('signOutButton').addEventListener('click', ()=>{
  localStorage.setItem("username", 'null');
  signOutButton.style.display = 'none'
  document.getElementById('usernameText').style.display = 'none'
  document.getElementById('signUpButton').style.display = 'inline'
  document.getElementById('logInBUtton').style.display = 'inline'
});
document.getElementById('startTestSession').addEventListener('click', ()=>{
  document.getElementById('menuBox').style.display = 'none';
  document.getElementById('startSessionBox').style.display = 'block';
  fetch('/getUserTests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: localStorage.getItem('username')
    }),
  })
  .then(response => response.json())
  .then(data => {
    data = Array.from(data.data);
      for (let i = 0; i < data.length; i++) {
        createTestNameButtonForList(data[i], i)
      }
  })
});
let toper = 230
let session_id = null;
function createTestNameButtonForList (name, index) {
  const button = document.createElement('button');
  button.classList = ('testButton')
  button.id = `testButton${index}`
  button.textContent = name.test_name
  button.style.left = '24px'
  button.style.top = `${toper}px`
  toper += 80  
  button.onclick = function(button){
    const test_name = name.test_name;
    fetch('/startTestSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: localStorage.getItem('username'),
          testName: test_name
      }),
    })
    .then(response => response.json())
    .then(data => {
        startSessionBox.style.display = 'none'
        sessionCodeBox.style.display = 'block'
        sessionCodeText.textContent = 'Session code: ' + data.session_id
        session_id = data.session_id
    })
  }
  startSessionBox.appendChild(button)
}

sessionUpdateButton.addEventListener('click', ()=>{

  fetch('/getAnswers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        session_id: session_id,
        test_name: testName
    }),
  })
  .then(response => response.json())
  .then(data => {
    sessionCodeBox.style.display = 'none'
    tableViewBox.style.display = 'block'
    usernameCell.innerHTML = data.student_answers[0].username
    const correct = data.question_answers
    const student = data.student_answers
    for (let i = 0; i < correct.length; i++){
      const id = 'question_' + `${i+1}`
      if (correct[i].answer == student[i].answer){
        document.getElementById(id).style.backgroundColor = 'green'
      }else if (correct[i].type == 'openAnswer'){
        document.getElementById(id).style.backgroundColor = 'yellow'
      }else{
        document.getElementById(id).style.backgroundColor = 'red'
      }
    }
  })
});