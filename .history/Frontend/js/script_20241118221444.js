// Obtener referencias a los formularios y secciones
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const itemForm = document.getElementById('itemForm');
const itemsList = document.getElementById('itemsList');
const inventorySection = document.getElementById('inventory');
const authSection = document.getElementById('auth');
let token = '';

// Función para manejar el inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
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
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
});

// Función para manejar el registro de usuarios
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const res = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        alert(data.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar usuario. Por favor, intenta nuevamente.');
    }
});

// Función para manejar la adición de productos al inventario
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('itemName').value;
    const quantity = document.getElementById('itemQuantity').value;
    const description = document.getElementById('itemDescription').value;

    try {
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
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar producto. Por favor, intenta nuevamente.');
    }
});

// Función para obtener y mostrar los productos del inventario
const fetchItems = async () => {
    try {
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
    } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener productos. Por favor, intenta nuevamente.');
    }
};
function checkInventoryLevels(product) {
    if (product.quantity < product.standardQuantity) {
        alert(`Alerta: La cantidad del producto ${product.name} ha bajado del estándar.`);
    }
}