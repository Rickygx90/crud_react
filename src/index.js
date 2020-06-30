const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 4000)

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/tasks',require('./routes/task.routes'));

//Static files
app.use(express.static( path.join(__dirname, 'public') ))

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on Port: ${app.get('port')}`)
})