const mongoose = require('mongoose');

//Importar variables de entorno locales
require('dotenv').config({path: 'variables.env'});
console.log(process.env.URI);

//const URI = "mongodb+srv://crud_react:crud_react@cluster0.nfuw9.mongodb.net/Cluster0?retryWrites=true&w=majority";
//mongodb://localhost/mern-tasks
//mongodb+srv://crud_react:crud_react@cluster0.nfuw9.mongodb.net/Cluster0?retryWrites=true&w=majority
mongoose.connect(process.env.URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));


module.exports = mongoose;