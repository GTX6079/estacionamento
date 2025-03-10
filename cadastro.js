async function cadastrarUser(){
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    await fetch('http://localhost:3030/cadastro-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.success) {
            alert("Cadastro bem-sucedido!");
            window.location.href = "./index.html";
          } else {
            alert("Cadastro não funcionou!");
          }
    }
    )
  };