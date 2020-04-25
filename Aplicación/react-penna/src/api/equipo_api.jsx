
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/equipo_actions';

export function getEquipos(data) {
    var args={
                metodo  :'get',
                url     :'equipos',
                params  : data,
                callback: getSuccess
           };
    return DbCall.DbCall(args);
}

export function getPadres(data) {
   var args={
             metodo        :'post',
             url           :'equipos/padre',
             params        : data
          };
   return DbCall.DbCall(args);
}

export function addEquipo(data) {
   var args={
             metodo  : 'post',
             url     : 'equipos',
             params  : data,
             callback: addSuccess
          };
   return DbCall.DbCall(args);
}


export function updateEquipo(data) {
   var args={
             metodo  : 'put',
             url     : 'equipos',
             params  : data,
             callback: updateSuccess
          };
   return DbCall.DbCall(args);
}

export function reactivarEquipo(data) {
   var args={
             metodo  : 'put',
             url     : 'equipos/reactivar',
             params  : data
          };
   return DbCall.DbCall(args);
}


export function deleteEquipo(data) {
   var args={
             metodo        :'delete',
             url           :'equipos',
             params        : data,
             callback      : deleteSuccess,
             callbackParams: data.id_bien
          };
   return DbCall.DbCall(args);
}
