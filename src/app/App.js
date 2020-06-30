import React, { useState, useEffect } from 'react';
import Formulario from "./Components/Form";
import List from "./Components/List";
import './App.css'


async function fetchData(){
  const response = await fetch('http://localhost:4000/api/tasks/');
  const data = await response.json();
  return data;
}

const App = () => {

  const [ tareas, setTareas ] = useState([]);
  const [ datosFormulario, setDatosFormulario ] = useState({
    idTarea: '',
    inpTarea: '',
    slcResponsable: '',
    slcDificultad: '',
    textSubmit:'Guardar Tarea'
});

  async function obtenerData() {
    const response = await fetchData();
    setTareas(response)
  }

  useEffect( ()=>{
    obtenerData()
  }, [])
  
  const guardarTarea = (datos) => {
    console.log(datos.textSubmit)
    if(datos.textSubmit === 'Guardar Tarea'){
      fetch('http://localhost:4000/api/tasks/', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            setTareas([])
            obtenerData()
          }
        )
        .catch( err => console.log(err));
    }else if(datos.textSubmit === 'Editar Tarea'){
      let id = datosFormulario.idTarea;
      fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            setDatosFormulario({
              idTarea: '',
              inpTarea: '',
              slcResponsable: '',
              slcDificultad: '',
              textSubmit:'Guardar Tarea'
            })
            obtenerData()
          }
        )
        .catch( err => console.log(err));
    }else if(datos.textSubmit === "Cancelar"){
      setDatosFormulario({
        idTarea: '',
        inpTarea: '',
        slcResponsable: '',
        slcDificultad: '',
        textSubmit:'Guardar Tarea'
      })
    }
    
  }

  const deleteTask = (e) => {
    let id = e.target.id;
    fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'DELETE'
    })
    .then( res => res.json() )
    .then( data => { 
        obtenerData()
    })
    .catch( err => console.log(err));
}

const setFormulario = (arrayDatos) => {
  console.log(arrayDatos)
  obtenerData()
  setDatosFormulario({
    idTarea: arrayDatos[0],
    inpTarea: arrayDatos[1],
    slcResponsable: arrayDatos[2],
    slcDificultad: arrayDatos[3],
    textSubmit:'Editar Tarea'
  }) 
}

  return(
    
    <div className="cssApp">
      <h1 className="cssTitulo">TAREAS FAMILIARES</h1>
      { ( tareas && datosFormulario.textSubmit === 'Guardar Tarea' ) ?
        <List tareas={tareas} deleteTask={deleteTask} setFormulario={setFormulario}/> :
        ''
      }
      
      <Formulario datosFormulario={datosFormulario} guardarTarea={guardarTarea}/>
     
    </div>
  )

}

export default App;