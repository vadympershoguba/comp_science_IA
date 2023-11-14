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

let test = null;

document.getElementById('joinGetUsernameStart').addEventListener('click', ()=>{
    localStorage.setItem('username', joinGetUsername.value);
    joinEnterUsername.style.display = 'none';
    drawMultipleChoice()
    
})

function drawMultipleChoice(){
    joinMulptileChoiceDraw.style.display = 'block';
    joinMCQuestion.textContent = test.test[0].question;
    
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