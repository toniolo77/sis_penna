import * as types from '../actions/action-types';

export function getSuccess(prestaciones) {
  return {
    type: types.GET_PRESTACIONES_SUCCESS,
    prestaciones
  };
}

export function addSuccess(prestacion) {
  return {
    type: types.ADD_PRESTACION_SUCCESS,
    prestacion
  };
}

export function deleteSuccess(id_bien) {
  return {
    type: types.DELETE_PRESTACION_SUCCESS,
    id_bien
  };
}

export function updateSuccess(prestacion) {
  return {
    type: types.UPDATE_PRESTACION_SUCCESS,
    prestacion
  };
}
