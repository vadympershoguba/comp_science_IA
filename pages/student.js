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
      })
})

document.getElementById('joinGetUsernameStart').addEventListener('click', ()=>{
    localStorage.setItem('username', joinGetUsername.value);
    joinEnterUsername.style.display = 'none'
})