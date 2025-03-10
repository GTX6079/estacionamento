async function loadProducts() {
    const response = await fetch('http://localhost:3030/products');
    const data = await response.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; 
    console.log(data);
    data.products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.Modelo}</td>
        <td>${product.Placa}</td>
        <td>R$ ${product.Andar}</td>
        <td>
          <button onclick="editProduct(${product.id})">Editar</button>
          <button onclick="deleteProduct(${product.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }
  
  document.querySelector('.product-form form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const modelo = document.getElementById('product-name').value;
    const placa = document.getElementById('product-quantity').value;
    const andar = document.getElementById('product-price').value;
  
    await fetch('http://localhost:3030/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelo, placa, andar })
    });
  
    document.querySelector('.product-form form').reset();
    loadProducts();
  });
  
  async function deleteProduct(id) {
    await fetch(`http://localhost:3030/products/${id}`, {
      method: 'DELETE'
    });
    loadProducts();
  }
  
  async function editProduct(id) {
    const modelo = prompt("Novo modelo do carro:");
    const placa = prompt("Nova placa do carro:");
    const andar = prompt("Andar onde foi reposicionado:");
  
    await fetch(`http://localhost:3030/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  modelo, placa, andar })
    });
    loadProducts();
  }
  
  loadProducts();