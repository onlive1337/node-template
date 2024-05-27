const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = new Datastore({ filename: 'tasks.db', autoload: true });

app.post('/api/tasks', (req, res) => {
    const task = req.body;

    db.insert(task, (err, newDoc) => {
        if (err) {
            res.status(500).send({ error: 'Database error', details: err });
        } else {
            res.send({ success: true, task: newDoc });
        }
    });
});

app.get('/api/tasks', (req, res) => {
    db.find({}, (err, tasks) => {
        if (err) {
            res.status(500).send({ error: 'Database error', details: err });
        } else {
            res.send({ tasks });
        }
    });
});

app.patch('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    db.update({ _id: taskId }, { $set: updatedTask }, {}, (err, numReplaced) => {
        if (err) {
            res.status(500).send({ error: 'Database error', details: err });
        } else if (numReplaced === 0) {
            res.status(404).send({ error: 'Task not found' });
        } else {
            res.send({ success: true, numReplaced });
        }
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    db.remove({ _id: taskId }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send({ error: 'Database error', details: err });
        } else if (numRemoved === 0) {
            res.status(404).send({ error: 'Task not found' });
        } else {
            res.send({ success: true, numRemoved });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
