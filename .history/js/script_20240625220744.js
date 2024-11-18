const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const itemForm = document.getElementById('itemForm');
const itemsList = document.getElementById('itemsList');
const inventorySection = document.getElementById('inventory');
const authSection = document.getElementById('auth');
let token = '';

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.token) {
        token = data.token;
        authSection.style.display = 'none';
        inventorySection.style.display = 'block';
        fetchItems();
    } else {
        alert(data.message);
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);
});

itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const quantity = document.getElementById('itemQuantity').value;
    const description = document.getElementById('itemDescription').value;

    const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, quantity, description })
    });

    const data = await res.json();
    alert(data.message);
    fetchItems();
});

const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/items', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const items = await res.json();
    itemsList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} - ${item.description}`;
        itemsList.appendChild(li);
    });
};
