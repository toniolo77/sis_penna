import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getTecnicosSuccess,getPersonalSuccess,getTecnicoNoEntidadSuccess,getEntidadesTecnicoSuccess,getTecnicoEntidadFormSuccess,getTecnicoEntidadTableSuccess,addSuccess,deleteSuccess } from '../actions/tecnico_actions';



//Para completar la tabla
export function getTecnicos(filtro_tecnico) {
    let args={metodo:'get',
              url:'tecnicos',
              params:filtro_tecnico,
              callback:getTecnicosSuccess

           };
    return DbCall.DbCall(args);
}



//Obtiene todas las entidades a las que no pertenece el empleado con el legajo ingresado
export function getTecnicoNoEntidad(legajo) {
    let args={metodo:'post',
              url:'tecnico_entidad',
              params:{"legajo":legajo},
              callback:getTecnicoNoEntidadSuccess

           };
    return DbCall.DbCall(args);
}

export function  getEntidadesTecnico(){
    let args={metodo:'get',
              url:'entidades_tecnico',
              callback:getEntidadesTecnicoSuccess

           };
    return DbCall.DbCall(args);
}

//Obtiene los distintos técnicos filtrados según la entidad utilizado para el form del admin
export function getTecnicoEntidadForm(filtro) {
    let args={metodo:'get',
              url:'tecnico_entidad',
              params:filtro,
              callback:getTecnicoEntidadFormSuccess

           };
    return DbCall.DbCall(args);
}

//Obtiene los distintos técnicos filtrados según la entidad utilizado para el table del admin
export function getTecnicoEntidadTable(filtro) {
    let args={metodo:'get',
              url:'tecnico_entidad',
              params:filtro,
              callback:getTecnicoEntidadTableSuccess

           };
    return DbCall.DbCall(args);
}


//Agrega un nuevo técnico
export function addElemento(legajo,id_entidad) {
   let args={metodo:'post',
             url:'tecnicos',
             params:{legajo:legajo,id_entidad:id_entidad},
             callback:addSuccess
          };
   return DbCall.DbCall(args);
}


export function deleteElemento(tecnico) {
   let args={metodo:'delete',
             url:'tecnicos',
             params:{id_entidad:tecnico.id_entidad,legajo: tecnico.legajo },
             callback:deleteSuccess,
             callbackParams: tecnico
          };
   return DbCall.DbCall(args);
}
