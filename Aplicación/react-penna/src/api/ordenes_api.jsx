
import axios from 'axios';
import store from '../store';
import * as DbCall from '../componentes/commons/DbCall';
import {getSuccess,getBienesTablasSuccess,addOrdenSuccess,getOrdenSuccess,getOrdenesSuccess,putConformidadSuccess,asignarOrdenSuccess,derivarOrdenSuccess,actualizarOrdenSuccess,resetTablaOrdenes} from '../actions/ordenes_actions';

export function getBienes(bienes) {
    var args={metodo:'post',
              url:'bienes',
              params:bienes,
              callback:getSuccess
           };
    return DbCall.DbCall(args);
}

export function getBienesTablas(bienes) {
    var args={metodo:'post',
              url:'bienes_solicitud',
              params:bienes,
              callback:getBienesTablasSuccess
           };
    return DbCall.DbCall(args);
}

export function addOrden(orden) {
    var args={metodo:'post',
              url:'ordenes',
              params:orden,
              callback:addOrdenSuccess
           };
    return DbCall.DbCall(args);
}

//Obtiene los datos de la orden de trabajo
export function getOrden(filtro_orden) {
    var args={metodo:'get',
              url:'ordenes',
              params:filtro_orden,
              callback:getOrdenSuccess
           };
    return DbCall.DbCall(args);
}

//Obtiene los datos de las ordenes de trabajo con el detalle correspondiente
export function getOrdenes(filtros_ordenes) {
    var args={metodo:'post',
              url:'ver_ordenes',
              params:filtros_ordenes,
              callback:getOrdenesSuccess
           };
    return DbCall.DbCall(args);
}

//Obtiene los datos de las ordenes de trabajo con el detalle correspondiente
export function putConformidadOrden(conformidad) {
    var args={metodo:'put',
              url:'ver_ordenes',
              params:conformidad,
              callback:putConformidadSuccess
           };
    return DbCall.DbCall(args);
}

/**
 * Asigna a la orden de trabajo a una persona para que la realice
 * @param   orden array(
 *                     id_orden_trabajo : id de la orden de trabajo
 *                     leg_recepcion    : legajo de un técnico que va a tomar la orden de trabajo
 *                     )
 */
export function asignarOrden(orden) {
    var args={metodo:'put',
              url:'ordenes/asignar',
              params:orden,
              callback:asignarOrdenSuccess
           };
    return DbCall.DbCall(args);
}

/**
 * Asigna a la orden de trabajo a una nueva entidad
 * @param   orden array(
 *                     id_orden_trabajo : id de la orden de trabajo
 *                     entidad_destino  : id de la entidad a la que se deriva la orden de trabajo
 *                     )
 */
export function derivarOrden(orden) {
    var args={metodo  : 'put',
              url     : 'ordenes/derivar',
              params  : orden,
              callback: derivarOrdenSuccess
           };
    return DbCall.DbCall(args);
}

/**
 * Actualiza la orden de trabajo
 */
export function actualizarOrden(orden) {
    var args={metodo  : 'put',
              url     : 'ordenes/actualizar',
              params  : orden,
              callback: actualizarOrdenSuccess
           };
    return DbCall.DbCall(args);
}

/**
 * Finaliza la orden de trabajo
 */
export function finalizarOrden(orden) {
    var args={
              metodo  : 'put',
              url     : 'ordenes/finalizar',
              params  : orden
           };
    return DbCall.DbCall(args);
}

/**
 * Actualiza la orden de trabajo
 */
export function rechazarOrden(orden) {
    var args={
              metodo : 'put',
              url    : 'ordenes/rechazar',
              params : orden
           };
    return DbCall.DbCall(args);
}

/**
 * Actualiza el estado de la orden de trabajo
 * @param array(id_orden_trabajo,estado)
 */
export function actualizarEstadoOrden(orden){
    var args={
              metodo  : 'put',
              url     : 'ordenes/actualizar_estado',
              params  : orden,
              callback: actualizarOrdenSuccess
           };
    return DbCall.DbCall(args);
}

/**
 * Resetea el store de la tabla
 */
export function resetTabla(){
    store.dispatch(resetTablaOrdenes());
}
