const mongoose = require('mongoose');
const { Schema }= mongoose;

const TaskSchema = new Schema({
    nombre: { type: String, required: true},
    responsable: { type: String, required: true},
    dificultad: { type: String, required: true},
    fechaInicio: { type: Date, required: true},
    fechaFin: { type: Date, required: true},
});

module.exports = mongoose.model('Task', TaskSchema);