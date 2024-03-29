const express = require('express');
const task = require('../models/task');
const router = express.Router(); // Create mountable and modular routes handlers.

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', {
        tasks: tasks
    });
});

router.post('/add', async (req, res, next) => {
    const task = new Task(req.body);
    await task.save(); //Save the task into the database
    res.redirect('/');
});

router.get('/turn/:id', async(req, res) =>{
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task: task
    });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/')
});

module.exports = router;