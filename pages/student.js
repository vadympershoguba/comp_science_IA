let test = null;
let questionIndex = 0;

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
  joinQuestionDraw.style.display = 'block'
  const questionType = test.test[questionIndex].type
  localStorage.setItem('username', joinGetUsername.value);
  joinEnterUsername.style.display = 'none';
  if (questionType == 'Multiple Choice') {
    drawMultipleChoice(questionIndex);
  } else if (questionType == 'True or False'){
    drawTrueFalse(questionIndex)
  } else if (questionType = 'Open answer'){
    drawOpenAnswer(questionIndex)
  }
  questionIndex++
})

document.getElementById('joinNextButton').addEventListener('click', ()=>{
  joinMCQuestion.textContent = ''

  const questionType = test.test[questionIndex].type
  if (questionType == 'Multiple Choice') {
    drawMultipleChoice(questionIndex);
  } else if (questionType == 'True or False'){
    drawTrueFalse(questionIndex)
  } else if (questionType = 'Open answer'){
    drawOpenAnswer(questionIndex)
  }
  questionIndex++;
  inputs = Array.from(document.getElementsByClassName('joinOptionTextMultipleChoise')).map(input => input.value = '');
  
});

function drawTrueFalse(index){
  joinQuestionDraw.style.height = '240px'
  joinNextButton.style.top = '250px'
  joinMCQuestion.textContent = test.test[index].question;
  joinMulptileChoiceDraw.style.display = 'none';
  joinTrueFalseDraw.style.display = 'block'

}

function drawMultipleChoice(index){
  joinQuestionDraw.style.height = '400px'
    joinMulptileChoiceDraw.style.display = 'block';
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