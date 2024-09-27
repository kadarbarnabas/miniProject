const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Szó pár hozzáadása (Create)
router.post('/', (req, res) => {
    const newWordPair = req.body;

    const data = fs.readFileSync(path.join(__dirname, '../Models/wordPairs.json'), 'utf8');
    const wordPairs = JSON.parse(data || '[]');
    wordPairs.push(newWordPair);

    fs.writeFileSync(path.join(__dirname, '../Models/wordPairs.json'), JSON.stringify(wordPairs, null, 2));
    res.status(201).json(newWordPair);
});

// Szó párok listázása (Read)
router.get('/', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../Models/wordPairs.json'), 'utf8');
    const wordPairs = JSON.parse(data || '[]');
    res.status(200).json(wordPairs);
});

// Szó pár frissítése (Update)
router.put('/:english', (req, res) => {
    const english = req.params.english;
    const updatedWordPair = req.body;

    const data = fs.readFileSync(path.join(__dirname, '../Models/wordPairs.json'), 'utf8');
    const wordPairs = JSON.parse(data || '[]');
    const wordIndex = wordPairs.findIndex(word => word.english === english);

    wordPairs[wordIndex] = { ...wordPairs[wordIndex], ...updatedWordPair };

    fs.writeFileSync(path.join(__dirname, '../Models/wordPairs.json'), JSON.stringify(wordPairs, null, 2));
    res.status(200).json(wordPairs[wordIndex]);
});

// Szó pár törlése (Delete)
router.delete('/:english', (req, res) => {
    const english = req.params.english;

    const data = fs.readFileSync(path.join(__dirname, '../Models/wordPairs.json'), 'utf8');
    const wordPairs = JSON.parse(data || '[]');
    const updatedWordPairs = wordPairs.filter(word => word.english !== english);

    fs.writeFileSync(path.join(__dirname, '../Models/wordPairs.json'), JSON.stringify(updatedWordPairs, null, 2));
    res.status(204).send();
});

module.exports = router;
