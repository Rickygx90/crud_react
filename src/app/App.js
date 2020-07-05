import React, { useState, useEffect } from 'react';
import Formulario from "./Components/Form";
import List from "./Components/List";
import './App.css'
//const URI = 'http://localhost:4000/api/tasks/';
const URI = 'https://crud-familiar-react.herokuapp.com/api/tasks/';

async function fetchData(){
  const response = await fetch(URI);
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
    inpFechaInicio: moment().format('YYYY-MM-DDThh:mm'),
    inpFechaFin: moment().format('YYYY-MM-DDThh:mm'),
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
    
    if(datos.textSubmit === 'Guardar Tarea'){
      fetch(URI, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
        .then( res => res.json() )
        .then( data => {
            obtenerData()
        })
        .catch( err => console.log(err));
    }else if(datos.textSubmit === 'Editar Tarea'){
      let id = datosFormulario.idTarea;
      fetch(URI+`${id}`, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
        .then( res => res.json() )
        .then( data => {
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
    fetch(URI+`${id}`, {
        method: 'DELETE'
    })
    .then( res => res.json() )
    .then( data => { 
        obtenerData()
    })
    .catch( err => console.log(err));
}

const setFormulario = (arrayDatos) => {
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
      <div className="contenedor">
        <Formulario datosFormulario={datosFormulario} guardarTarea={guardarTarea}/>
        { ( tareas && datosFormulario.textSubmit === 'Guardar Tarea' ) ?
          <List tareas={tareas} deleteTask={deleteTask} setFormulario={setFormulario}/> :
          ''
        }
      </div>
      
     
    </div>
  )

}

export default App;