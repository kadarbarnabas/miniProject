const express = require('express');
const path = require('path');
const app = express();

// Statikus fájlok kiszolgálása (HTML, CSS)
app.use(express.static(path.join(__dirname, 'UI')));

// Egyszerű útvonal a Hello World-hoz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'UI', 'index.html'));
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
