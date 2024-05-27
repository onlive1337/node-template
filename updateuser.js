const fetch = require('node-fetch');

async function updateUser(userId) {
    const updatedUser = {
        username: 'onlive',
        email: 'onlive@gmail.com',
        password: 'onlivepass'
    };

    try {
        const response = await fetch(`http://localhost:3000/api/items/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('User updated', data);
        } else {
            console.error('Error updating user', data);
        }
    } catch (err) {
        console.error('Error updating user', err);
    }
}


const userId = 'TgsMZPmPK9gVF44a';


(async () => {
    await updateUser(userId);
})();
