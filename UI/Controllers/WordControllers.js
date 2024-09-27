const apiUrl = '/api/words';

// Szó párok lekérése
async function fetchWordPairs() {
    const response = await fetch(apiUrl);
    return await response.json();
}

// Új szó pár hozzáadása
async function addWordPair(wordPair) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordPair),
    });
    return await response.json();
}

// Szó pár frissítése
async function updateWordPair(english, wordPair) {
    const response = await fetch(`${apiUrl}/${english}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordPair),
    });
    return await response.json();
}

// Szó pár törlése
async function deleteWordPair(english) {
    await fetch(`${apiUrl}/${english}`, {
        method: 'DELETE',
    });
}

// Exportálás
export { fetchWordPairs, addWordPair, updateWordPair, deleteWordPair };
