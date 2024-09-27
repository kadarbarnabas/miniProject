const express = require('express');
const path = require('path');
const userRoutes = require('./userRoutes'); // Győződj meg róla, hogy ez a helyes útvonal

const app = express();
const PORT = 3000;

// Middleware beállítása JSON testek kezelésére
app.use(express.json());


app.use(express.static(path.join(__dirname, '../UI'))); // Állítsd be a helyes mappát

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../UI/index.html')); // Kiszolgáljuk az index.html fájlt
});

// Users route
app.use('/api/users', userRoutes); // Route configuration

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
