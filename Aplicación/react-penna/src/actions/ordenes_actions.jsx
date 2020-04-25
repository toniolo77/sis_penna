import * as types from '../actions/action-types';

////////////////
///ORDENES /////
////////////////

export function resetTablaOrdenes(){
    return {
        type: types.RESET_TABLA_ORDENES,
    }
}


////////////////
//ABM ORDENES //
////////////////

export function getSuccess(bienes) {
  return {
    type: types.GET_BIENES_SUCCESS,
    bienes
  };
}

export function getBienesTablasSuccess(bienes_solicitud) {
  return {
    type: types.GET_BIENES_TABLAS_SUCCESS,
    bienes_solicitud
  };
}


export function addOrdenSuccess(bienes_solicitud) {
  return {
    type: types.ADD_ORDEN_TRABAJO_SUCCESS,
    bienes_solicitud
  };
}

/**
 * Obtiene los datos de una orden en particular sin los detalles (Funcion : Ver mas)
 */
export function getOrdenSuccess(orden) {
  return {
    type: types.GET_ORDEN_TRABAJO_SUCCESS,
    orden
  };
}


////////////////
//VER ORDENES //
////////////////

/**
 * Obtiene los datos de las ordenes de trabajo con el detalle correspondiente
 */
export function getOrdenesSuccess(ordenes) {
  return {
    type: types.GET_ORDENES_SUCCESS,
    ordenes
  };
}

//Dar la conformidad de la orden de trabajo
export function putConformidadSuccess(conformidad) {
  return {
    type: types.PUT_CONFORMIDAD_ORDEN,
    conformidad
  };
}

/////////////////
//ADMIN ORDENES//
/////////////////

/**
 * Obtiene los datos de las ordenes de trabajo con el detalle correspondiente
 */
export function asignarOrdenSuccess(orden) {
  return {
    type: types.ASIGNAR_ORDEN,
    orden
  };
}

//Dar la conformidad de la orden de trabajo
export function derivarOrdenSuccess(orden) {
  return {
    type: types.DERIVAR_ORDEN,
    orden
  };
}

//Actualiza la orden de trabajo
export function actualizarOrdenSuccess(orden) {
  return {
    type: types.ACTUALIZAR_ORDEN,
    orden
  };
}
