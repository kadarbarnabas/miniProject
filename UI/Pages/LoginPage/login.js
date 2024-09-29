// login.js
const apiUrl = '/api/users'; 

// Handle login form submission
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

// Handle registration button click
document.querySelector('.register-btn').addEventListener('click', async () => {
    const username = document.querySelector('.login-form input[type="text"]').value;
    const email = document.querySelector('.login-form input[type="email"]').value;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();
        const userExists = users.some(user => user.username === username || user.email === email);

        if (userExists) {
            alert('This email or username is already in use.');
        } else {
            // Register new user
            const newUser = { username, email };
            const registerResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (registerResponse.ok) {
                alert('Registration successful! You can now log in.');
                window.location.href = 'game.html';
            } else {
                throw new Error('Failed to register user');
            }
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while trying to register.');
    }
});
