const fetch = require('node-fetch');

async function getUserByEmail(email) {
    try {
        const response = await fetch(`http://localhost:3000/api/items?email=${encodeURIComponent(email)}`);
        if (response.status === 200) {
            const data = await response.json();
            console.log('User found', data);
            return data.user._id;
        } else if (response.status === 404) {
            console.log('User not found');
            return null;
        } else {
            const errorData = await response.json();
            console.error('Error finding user', errorData);
            return null;
        }
    } catch (err) {
        console.error('Error finding user', err);
        return null;
    }
}

async function addUser() {
    const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
    };

    const existingUserId = await getUserByEmail(newUser.email);
    if (existingUserId) {
        console.log('User already exists with ID:', existingUserId);
        return existingUserId;
    }

    try {
        const response = await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('New user added', data);
            return data.user._id;
        } else {
            console.error('Error adding new user', data);
        }
    } catch (err) {
        console.error('Error adding new user', err);
    }
}

(async () => {
    await addUser();
})();
