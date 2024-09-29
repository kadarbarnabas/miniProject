// login.js
const apiUrl = '/api/users'; 

document.querySelector('.login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const username = event.target[0].value; 
    const email = event.target[1].value; 

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        const userExists = users.some(user => user.username === username && user.email === email);

        if (userExists) {
            
            window.location.href = 'game.html'; 
        } else {
            
            alert('Invalid username or email.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while trying to log in.');
    }
});
