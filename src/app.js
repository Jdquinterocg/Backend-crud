const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');

const app = express();

// Connecting to db
mongoose.connect('mongodb://localhost/first-crud', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Db connected successfully'))
    .catch(err => console.log(err));

// Importing routes
const indexRoutes = require('./routes/index')

// settings
app.set('port', process.env.PORT || 3000); // Settings a port
app.set('views', path.join(__dirname, 'views')); // Where views are
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev')); //Message in the console that tell us the petition our app
app.use(express.urlencoded({extended: false})); // Understand the data sent by navigator

// Routes
app.use('/', indexRoutes);

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});