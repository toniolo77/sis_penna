
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/prestacion_actions';

export function getPrestaciones(data) {
    var args={metodo:'get',
              url:'prestaciones',
              params:data,
              callback:getSuccess
           };
    return DbCall.DbCall(args);
}

export function addPrestacion(data) {
   var args={
             metodo  : 'post',
             url     : 'prestaciones',
             params  : data,
             callback: addSuccess
          };
   return DbCall.DbCall(args);
}


export function updatePrestacion(data) {
   var args={
             metodo  : 'put',
             url     : 'prestaciones',
             params  : data,
             callback: updateSuccess
          };
   return DbCall.DbCall(args);
}


export function deletePrestacion(data) {
   var args={
             metodo        :'delete',
             url           :'prestaciones',
             params        : data,
             callback      : deleteSuccess,
             callbackParams: data.id_bien
          };
   return DbCall.DbCall(args);
}
