const mongoose = require('mongoose');
const URI = "mongodb+srv://crud_react:crud_react@cluster0.nfuw9.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));


module.exports = mongoose;