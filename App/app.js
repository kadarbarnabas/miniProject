const express = require('express');
const path = require('path');
const userRoutes = require('./userRoutes');
const wordRoutes = require('./wordRoutes');

const app = express();
const PORT = 3000;

// Middleware beállítása JSON testek kezelésére
app.use(express.json());


app.use(express.static(path.join(__dirname, '../UI/Pages/LoginPage')));

app.use(express.static(path.join(__dirname, '../UI/Pages/GamePage')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI/Pages/LoginPage/login_page.html')); 
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI/Pages/GamePage/game.html')); 
});


// Felhasználók CRUD útvonalak
app.use('/api/users', userRoutes);

// Szó párok CRUD útvonalak
app.use('/api/words', wordRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
