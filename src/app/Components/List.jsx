import React from "react";
import '../App.css'

export default function List(props) {
    //const [ arrayTareas, setArrayTareas ] = useState(props.tareas);
    
    const borrarTareas = (e)=>{
        props.deleteTask(e);
    }

    const editarTarea = (e)=>{
        var arrayDatos = [
            e.target.id,
            document.getElementById(e.target.id).childNodes[1].innerText,
            document.getElementById(e.target.id).childNodes[2].innerText,
            document.getElementById(e.target.id).childNodes[3].childNodes[0].id
        ]
        props.setFormulario(arrayDatos);
    }
    

    return (

        <div className="cssTable">
            <h1 className="cssTitutloTable">Lista de tareas</h1>
            <div className="cssScroll" id="style-1">
            <div className="Table">
        
                <div className="Heading">
                    <div className="Cell">
                    <p>#</p>
                    </div>
                    <div className="Cell">
                    <p>Estado</p>
                    </div>
                    <div className="Cell">
                        <p>Tarea</p>
                    </div>
                    <div className="Cell">
                        <p>Responsable</p>
                    </div>
                    <div className="Cell">
                        <p>Dificultad</p>
                    </div>
                    <div className="Cell">
                        <p>Fecha Inicio</p>
                    </div>
                    <div className="Cell">
                        <p>Fecha Fin</p>
                    </div>
                    <div className="Cell">
                        <p>Acciones</p>
                    </div>
                </div>

                { props.tareas.length > 0 ?
                    props.tareas.map( (e, i)=>{
                    return (
                        <div className="Row" id={e._id} key={e._id}>
                            <div className="Cell">
                            <p>{i+1}</p>
                            </div>
                            <div className="Cell">
                            { e.fechaFin ?
                                (moment(e.fechaFin) <= moment()) ?
                                    <p className="pointRed" title="Expirada"></p>
                                :  
                                    <p className="pointGreen" title="A Tiempo"></p>   
                             :
                             <p className="pointYellow" title="Sin Fecha"></p>
                            }
                            </div>
                            <div className="Cell">
                                <p>{e.nombre}</p>
                            </div>
                            <div className="Cell">
                            <p>{e.responsable}</p>
                            </div>
                            <div className="Cell">
                                {
                                    (e.dificultad === '0') &&
                                        <p id={e.dificultad}>Baja</p>
                                }
                                {
                                    (e.dificultad === '1') &&
                                        <p id={e.dificultad}>Media</p>
                                }
                                {
                                    (e.dificultad === '2') &&
                                        <p id={e.dificultad}>Alta</p>
                                }

                            </div>
                            <div className="Cell">
                            {(e.fechaInicio) ?
                                <p>{moment(e.fechaInicio).format('YYYY-MM-DD | hh:mm')}</p>
                            :
                                ''
                            }
                            </div>
                            <div className="Cell">
                            {(e.fechaFin) ?
                                <p>{moment(e.fechaFin).format('YYYY-MM-DD | hh:mm')}</p>
                            :
                                ''
                            }
                            </div>
                            <div className="Cell">
                                <button title="Eliminar Tarea" id={e._id} onClick={borrarTareas} className="fa fa-trash" aria-hidden="true" >
                                </button>
                                &nbsp;&nbsp;
                                <button title="Editar Tarea" id={e._id} onClick={editarTarea} className="fa fa-pencil" aria-hidden="true">
                                </button>
                            </div>
                        </div>
                    
                    )
                })
                    :
                    <h1>No hay Tareas registradas</h1>
                }
            </div>
            </div>
        </div>
    );
}