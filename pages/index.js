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