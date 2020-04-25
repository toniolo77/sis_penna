
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getSuccess,addSuccess,updateSuccess, deleteSuccess } from '../actions/personal_actions';

export function getPersonal() {
    var args={metodo:'get',
              url:'personal',
              params:{},
              callback:getSuccess

           };
    return DbCall.DbCall(args);
}

export function addPersonal(personal) {
   var args={metodo:'post',
             url:'personal',
             params:personal,
             callback:addSuccess
          };
   return DbCall.DbCall(args);
}


export function updatePersonal(personal) {
   var args={metodo:'put',
             url:'personal',
             params:personal,
             callback:updateSuccess
          };
   return DbCall.DbCall(args);
}


export function deletePersonal(legajo) {
   var args={metodo:'delete',
             url:'personal',
             params:{legajo:legajo},
             callback:deleteSuccess,
             callbackParams: legajo
          };
   return DbCall.DbCall(args);
}

export function existePersonal(personal) {
   var args={metodo:'post',
             url:'personal/existe',
             params:personal
          };
   return DbCall.DbCall(args);
}
