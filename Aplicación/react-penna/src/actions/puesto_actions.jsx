import * as types from '../actions/action-types';

export function getPuestosSuccess(puestos) {
  return {
    type: types.GET_PUESTOS_SUCCESS,
    puestos
  };
}

export function addPuestoSuccess(puesto) {
  return {
    type: types.ADD_PUESTO_SUCCESS,
    puesto
  };
}

export function deletePuestoSuccess(id_puesto) {
  return {
    type: types.DELETE_PUESTO_SUCCESS,
    id_puesto
  };
}

export function updatePuestoSuccess(puesto) {
  return {
    type: types.UPDATE_PUESTO_SUCCESS,
    puesto
  };
}
