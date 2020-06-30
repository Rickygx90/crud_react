import React, { useState, useEffect } from "react";
import Logo from './Logo'
import '../App.css'

const Formulario = (props) => {
    var estilo;
    var estiloSubmit;
    var estiloCancel;
    if(props.datosFormulario.textSubmit === 'Guardar Tarea'){
        estilo = "cssForm"
        estiloSubmit = "cssSubmit"
        estiloCancel ="cssCancel"
    }else{
        estilo = "cssForm2"
        estiloSubmit = "cssSubmit2"
        estiloCancel ="cssCancel2"
    }
    
    const [ datos, setDatos ] = useState({
        inpTarea: '',
        slcResponsable: '',
        slcDificultad: '',
        textSubmit: ''
    });

    useEffect(()=>{
        setDatos(
            {
                inpTarea: props.datosFormulario.inpTarea,
                slcResponsable: props.datosFormulario.slcResponsable,
                slcDificultad: props.datosFormulario.slcDificultad,
                textSubmit: props.datosFormulario.textSubmit
            }
        )
    }, [props])
    

    const onSubmit = (e) => {
        props.guardarTarea(datos);
        setDatos({
            inpTarea: '',
            slcResponsable: '',
            slcDificultad: '',
            textSubmit:'Guardar Tarea'
        });
        e.preventDefault();
    }

    const cancelEdit = (e) => {
        let datos = {
            textSubmit:e.target.value
        }
        props.guardarTarea(datos);
    }
    
    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className={estilo}>
            <Logo/>
            <form onSubmit={onSubmit}>
                <label htmlFor="inpTarea">Nombre de la tarea: </label> <br/>
                <input className="cssInp" type="text" name="inpTarea" id="inpTarea" onChange={handleChange} value={datos.inpTarea} required/>
                <br/>

                <label htmlFor="slcResponsable">Responsable:</label> <br/>
                <select className="cssInp" name="slcResponsable" id="slcResponsable" onChange={handleChange} value={datos.slcResponsable} required>
                    <option value="" defaultValue>Seleccione un Responsable</option>
                    <option value="douglas">Douglas</option>
                    <option value="saul">El gordito pequeño</option>
                    <option value="felipe">El otro Gordito</option>
                    <option value="mama">Marjorie</option>
                </select>
                <br/>

                <label htmlFor="slcDificultad">Dificultad: </label> <br/>
                <select className="cssInp" name="slcDificultad" id="slcDificultad" onChange={handleChange} value={datos.slcDificultad} required>
                <option value="" defaultValue>Seleccione la Dificultad</option>
                    <option value="0">Baja</option>
                    <option value="1">Media</option>
                    <option value="2">Alta</option>
                </select>
                
                <br/>

                <input id="inpSubmit" className={estiloSubmit} type="submit" value={datos.textSubmit}/>

                <input type="button" id="inpCancel" onClick={cancelEdit} className={estiloCancel} value="Cancelar"/>
            </form>
        </div>
    )
}

export default Formulario;