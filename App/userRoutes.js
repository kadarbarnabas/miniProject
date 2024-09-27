const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

// Felhasználók lekérése
router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../Models/users.json'), 'utf8', (err, data) => {
        const users = JSON.parse(data || '[]');
        res.json(users);
    });
});

// Új felhasználó hozzáadása
router.post('/', (req, res) => {
    const newUser = req.body;
    fs.readFile(path.join(__dirname, '../Models/users.json'), 'utf8', (err, data) => {
        const users = JSON.parse(data || '[]');
        users.push(newUser);

        fs.writeFile(path.join(__dirname, '../Models/users.json'), JSON.stringify(users, null, 2), (err) => {
            res.status(201).json(newUser); 
        });
    });
});

// Felhasználó frissítése (Update)
router.put('/:username', (req, res) => {
    const username = req.params.username;
    const updatedUser = req.body;

    fs.readFile(path.join(__dirname, '../Models/users.json'), 'utf8', (err, data) => {
        const users = JSON.parse(data || '[]');
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedUser };

            fs.writeFile(path.join(__dirname, '../Models/users.json'), JSON.stringify(users, null, 2), (err) => {
                res.status(200).json(users[userIndex]);
            });
        } else {
            res.status(404).json({ message: 'Felhasználó nem található' });
        }
    });
});

// Felhasználó törlése (Delete)
router.delete('/:username', (req, res) => {
    const username = req.params.username;

    fs.readFile(path.join(__dirname, '../Models/users.json'), 'utf8', (err, data) => {
        const users = JSON.parse(data || '[]');
        const updatedUsers = users.filter(user => user.username !== username);

        if (users.length !== updatedUsers.length) {
            fs.writeFile(path.join(__dirname, '../Models/users.json'), JSON.stringify(updatedUsers, null, 2), (err) => {
                res.status(204).send();
            });
        } else {
            res.status(404).json({ message: 'Felhasználó nem található' });
        }
    });
});

module.exports = router;
