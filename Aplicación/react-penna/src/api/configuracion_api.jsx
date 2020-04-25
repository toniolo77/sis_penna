
import axios from 'axios';
import * as DbCall from '../componentes/commons/DbCall';



export function updatePassword(data) {
   var args={
             metodo  : 'put',
             url     : 'password',
             params  : data
          };

   return DbCall.DbCall(args);
}

export function resetPassword(data) {
   var args={
             metodo  : 'post',
             url     : 'password',
             params  : data
          };

   return DbCall.DbCall(args);
}
