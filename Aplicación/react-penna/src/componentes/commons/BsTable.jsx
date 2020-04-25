var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import {ModalBs} from '../genericos/ModalBs';
import {Boton} from '../genericos/FormElements';

const Text_Vacio="Ninguno";


export const btnEliminar = (onClick) => {
   return (
	   <DeleteButton
			 btnText='Eliminar'
			 btnContextual='btn-danger'
			 className='my-custom-class'
			 btnGlyphicon='glyphicon-trash'
			 onClick={onClick}/>
		 );
}

export const searchField = (props) => {
  return (
    <SearchField
        className=''
        defaultValue=''
        placeholder='Buscar'/>
  );
}

export const btnClear = (onClick) => {
  return (
    <ClearSearchButton
      btnText='Limpiar'
      btnContextual='btn-default'
      className='my-custom-class'
      onClick={onClick}/>
  );
}

export const btnXls  = (onClick) => {
  return (
    <ExportCSVButton
      btnText='Descargar XLS'
      onClick={onClick}/>
  );
}

export const selectFila={
	mode: 'checkbox'
};

/**
 * Carga el select para poder editar en la tabla
 * @param  {[type]} options    optiones que muestra el select
 * @param  {[type]} key        llave que tiene las opciones
 * @param  {[type]} value      valor que tiene las opciones
 * @param  {[type]} cell       valor actual de la celda
 * @param  {[type]} row        fila completa
 * @return [type]
 */
export const selectEditFormat = (options,key,value,cell,row) => {
    let option;
    let found=false;
    options.forEach((item, index) => {
        if (item[key]==cell){
            option= item[value];
            found=true;
        }
    });
    if (found)
        return option;
    else {
        return Text_Vacio;
    }
}

/**
 * Agrega la opción vacia al conjunto de opciones
 * @param {[type]} options      optiones que muestra el select
 * @param {[type]} id          valor que tiene las opciones
 * @param {[type]} description descripcion de las opciones
 */
export const addEditOption = (options,id,description) => {
    let new_options= options.slice();
    if (options.length>0 && options[0][id]!=""){
        let new_object= {};
        new_object[id]= "";
        new_object[description]= Text_Vacio;
        new_options.unshift(new_object);
        return new_options;
    }
    else{
        return new_options;
    }
}


////////////////
//VALIDACIONES //
////////////////
export const invalidClass = (cell, row) =>{
    return 'invalid';
}

export const columnRequired = (valor) => {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };

    if(valor.length==0){
        response.isValid            = false;
        response.notification.type  = 'error';
        response.notification.title = 'El campo no puede ser vacío';
        response.notification.msg   = 'Esc para cancelar';
    }
    return response;
}
export const columnNumeric = (valor) => {
    const response = columnRequired(valor);

    if(response.isValid && isNaN(valor)){
        response.isValid            = false;
        response.notification.type  = 'error';
        response.notification.title = 'El campo debe ser un valor numérico';
        response.notification.msg   = 'Esc para cancelar';
    }
    return response;
}

export const columnDate = (valor) => {
    const response = columnRequired(valor);
    if(response.isValid){
        var t = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if(t === null)
            response.isValid = false;
        else{
            var d = +t[1], m = +t[2], y = +t[3];

            if(m < 1 || m > 12 || d < 1 || d > 31) {
                response.isValid = false;
            }

        }

        if(!response.isValid){
            response.notification.type  = 'error';
            response.notification.title = 'Formato: dd/mm/yyyy';
            response.notification.msg   = 'Esc para cancelar';
        }

    }
    return response;
}

export const genericCustomConfirm = (next, dropRowKeys) => {
     const dropRowKeysStr = dropRowKeys.join(',');
	 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	   next();
	 }
//     let isVisible=true;
//     console.log("easdasd");
//     fucionrender()
//     render(){
//         return (
//             <div>
//             	<ModalBs show={true}  titulo="Solicitar">
//             		<div>
//                         Está seguro que desea eliminar las fila seleccionada
//                         	<div className="btn-form">
//                                 <Boton
//                                     onClick={ () => {next();isVisible=false;}}
//                                     clases="btn-success"
//                                     icon="fa fa-check"
//                                     label="Crear orden"
//                                 />
//                             </div>
//             		</div>
//             	</ModalBs>
//             </div>
//     )
// }
}
