const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.json());


const dbFilePath = path.join(__dirname, 'users.db');
const db = new Datastore({ filename: dbFilePath, autoload: true });


console.log(`Database file path: ${dbFilePath}`);


app.get('/api/items', (req, res) => {
    const email = req.query.email;

    console.log(`Searching for user with email: ${email}`);
    db.findOne({ email: email }, (err, user) => {
        if (err) {
            console.error('Database error on finding user', err);
            res.status(500).send({ error: 'Database error', details: err });
        } else if (user) {
            console.log('User found:', user);
            res.send({ user });
        } else {
            console.log('User not found');
            res.status(404).send({ error: 'User not found' });
        }
    });
});


app.post('/api/items', (req, res) => {
    const newUser = req.body;

    console.log(`Attempting to add user with email: ${newUser.email}`);
    db.findOne({ email: newUser.email }, (err, existingUser) => {
        if (err) {
            console.error('Database error on finding user', err);
            res.status(500).send({ error: 'Database error', details: err });
        } else if (existingUser) {
            console.log('User already exists:', existingUser);
            res.status(409).send({ error: 'User already exists' });
        } else {
            db.insert(newUser, (err, newDoc) => {
                if (err) {
                    console.error('Database error on inserting user', err);
                    res.status(500).send({ error: 'Database error', details: err });
                } else {
                    console.log('New user added:', newDoc);
                    res.send({ success: true, user: newDoc });
                }
            });
        }
    });
});


app.put('/api/items/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    console.log(`Attempting to update user with ID: ${userId}`);
    db.update({ _id: userId }, { $set: updatedUser }, {}, (err, numReplaced) => {
        if (err) {
            console.error('Database error on updating user', err);
            res.status(500).send({ error: 'Database error', details: err });
        } else if (numReplaced === 0) {
            console.log('User not found for update');
            res.status(404).send({ error: 'User not found' });
        } else {
            console.log('User updated:', updatedUser);
            res.send({ success: true, numReplaced });
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
