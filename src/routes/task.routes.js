const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { json } = require('express');

router.get('/', async (req, res)=>{
    const tasks = await Task.find();
    console.log(tasks)
    res.json( tasks )
});

router.post('/', async (req, res)=>{

    const { inpTarea, slcResponsable, slcDificultad }= req.body;
    const task = new Task({
        nombre: inpTarea,
        responsable: slcResponsable,
        dificultad: slcDificultad
    })
    await task.save();
    console.log(req.body);
    res.json({ status: "tarea guardada!!!" });
})

router.put('/:id', async (req, res) => {
    const { inpTarea, slcResponsable, slcDificultad }= req.body;
    const newTask = {
        nombre: inpTarea,
        responsable: slcResponsable,
        dificultad: slcDificultad
    };
    console.log(newTask)
    const task =  await Task.findByIdAndUpdate(req.params.id, newTask);
    
    res.json({ status: "tarea actualizada!!!" })
})

router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    await Task.findByIdAndDelete(req.params.id);
    res.json({ status: "tarea eliminada!!!" });
})

module.exports = router;