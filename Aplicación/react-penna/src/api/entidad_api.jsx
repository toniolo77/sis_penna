
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getEntidadesSuccess,addEntidadSuccess,updateEntidadSuccess, deleteEntidadSuccess } from '../actions/entidad_actions';

export function getEntidades() {
    var args={metodo:'get',
              url:'entidades',
              params:{},
              callback:getEntidadesSuccess

           };
    return DbCall.DbCall(args);
}

export function addEntidad(entidad) {
   var args={metodo:'post',
             url:'entidades',
             params:{tipo_entidad:entidad.tipo_entidad,nombre:entidad.nombre},
             callback:addEntidadSuccess
          };
    return DbCall.DbCall(args);
}


export function updateEntidad(entidad) {
   var args={metodo:'put',
             url:'entidades',
             params:{id_entidad:entidad.id_entidad,nombre:entidad.nombre},
             callback:updateEntidadSuccess
          };
    return DbCall.DbCall(args);
}


export function deleteEntidad(id_entidad) {
   var args={metodo:'delete',
             url:'entidades',
             params:{id_entidad:id_entidad},
             callback:deleteEntidadSuccess,
             callbackParams: id_entidad
          };
    return DbCall.DbCall(args);
}
