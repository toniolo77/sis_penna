
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getServiciosSuccess,addServicioSuccess,updateServicioSuccess, deleteServicioSuccess } from '../actions/servicio_actions';

/**
 * Obtiene todos los servicios
 *
 * @return [type]
 */

export function getServicios() {
  var args={metodo:'get',
            url:'servicios',
            params:{},
            callback:getServiciosSuccess

         };
  return DbCall.DbCall(args);
}

export function addServicio(nombre) {
   var args={metodo:'post',
             url:'servicios',
             params:{nombre:nombre},
             callback:addServicioSuccess
          };
   return DbCall.DbCall(args);
}

export function updateServicio(servicio) {
  var args={metodo:'put',
            url:'servicios',
            params:{id_servicio:servicio.id_servicio,nombre:servicio.nombre},
            callback:updateServicioSuccess,
            callbackParams: {id_servicio:servicio.id_servicio,nombre:servicio.nombre}
         };
  return DbCall.DbCall(args);
}


export function deleteServicio(id_servicio) {
   var args={metodo:'delete',
             url:'servicios',
             params:{id_servicio:id_servicio},
             callback:deleteServicioSuccess,
             callbackParams: id_servicio
          };
   return DbCall.DbCall(args);
}
