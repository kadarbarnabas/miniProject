const apiUrl = '/api/users';

// Felhasználók lekérése
async function fetchUsers() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Hiba történt a felhasználók lekérésekor');
    }
    return await response.json();
}

// Új felhasználó hozzáadása
async function addUser(user) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Hiba történt a felhasználó hozzáadása során');
    }
    return await response.json();
}

// Felhasználó frissítése
async function updateUser(id, user) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error('Hiba történt a felhasználó frissítése során');
    }
    return await response.json();
}

// Felhasználó törlése
async function deleteUser(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Hiba történt a felhasználó törlése során');
    }
}

// Exportálás
export { fetchUsers, addUser, updateUser, deleteUser };
