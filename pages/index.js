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

let marginnn = 0

document.getElementById('addQuestionButton').addEventListener('click', ()=>{
    let answers = Array.from(document.getElementsByClassName('checkMultipleChoise')).map(input => input.value)
    test.addQuestion(inputText.value, typeOfQuestion.value, [option1.value, option2.value, option3.value, option4.value], answers)
    emptyLines()

    const questionNumbers = Array.from(document.getElementsByClassName('questonListItem'))
    questionNumbers[questionNumbers.length-1].style.border = '1px solid black';
    let button = document.createElement('button')
    button.classList = 'questonListItem';
    button.style.border = '5px solid black';
    button.style.marginLeft = `${marginnn + 80}px`;
    marginnn+= 80;
    button.textContent = questionNumbers.length+1
    questionsList.appendChild(button)
});

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