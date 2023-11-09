document.getElementById('signUpButton').addEventListener('click', ()=>{
    document.getElementById('signUpBox').style.display = 'block'
    document.getElementById('body').style.filter = 'blur(5px)'
});

document.getElementById('signUpBoxBack').addEventListener('click', ()=>{
    document.getElementById('signUpBox').style.display = 'none'
    document.getElementById('body').style.filter = 'blur(0px)'
});

document.addEventListener("DOMContentLoaded", ()=>{
  username = localStorage.getItem("username");
  if (username.length >= 4) {
    document.getElementById('usernameText').style.display = 'block'
    document.getElementById('usernameText').innerHTML = username;
    document.getElementById('signUpButton').style.display = 'none'
    document.getElementById('logInBUtton').style.display = 'none'
  }
});


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

document.getElementById('menuBox').addEventListener('click', ()=>{
  document.getElementById('menuBox').style.display = 'none';
  document.getElementById('creationBox').style.display = 'block';
});

class Test {
  constructor() {
    this.questions = [];
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
});

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