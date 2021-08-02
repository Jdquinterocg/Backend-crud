const mongoose = require('mongoose');
const Schema = mongoose.Schema; // How data will look

const TaskSchema = Schema ({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tasks', TaskSchema) //Save data (TaskSchema) to a collection 