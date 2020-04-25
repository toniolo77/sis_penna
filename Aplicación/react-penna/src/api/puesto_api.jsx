
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import { getPuestosSuccess,addPuestoSuccess,updatePuestoSuccess, deletePuestoSuccess } from '../actions/puesto_actions';

export function getPuestos() {
    var args={metodo:'get',
              url:'puestos',
              params:{},
              callback:getPuestosSuccess

           };
    return DbCall.DbCall(args);
}

export function addPuesto(nombre) {
   var args={metodo:'post',
             url:'puestos',
             params:{nombre:nombre},
             callback:addPuestoSuccess
          };
   return DbCall.DbCall(args);
}


export function updatePuesto(puesto) {
   var args={metodo:'put',
             url:'puestos',
             params:{id_puesto:puesto.id_puesto,nombre:puesto.nombre},
             callback:updatePuestoSuccess,
             callbackParams: {id_servicio:puesto.id_puesto,nombre:puesto.nombre}
          };
   return DbCall.DbCall(args);
}


export function deletePuesto(id_puesto) {
   var args={metodo:'delete',
             url:'puestos',
             params:{id_puesto:id_puesto},
             callback:deletePuestoSuccess,
             callbackParams: id_puesto
          };
   return DbCall.DbCall(args);
}
