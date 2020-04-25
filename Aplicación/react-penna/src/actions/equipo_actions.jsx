import * as types from '../actions/action-types';

export function getSuccess(equipos) {
  return {
    type: types.GET_EQUIPOS_SUCCESS,
    equipos
  };
}

export function addSuccess(equipo) {
  return {
    type: types.ADD_EQUIPO_SUCCESS,
    equipo
  };
}

export function deleteSuccess(id_bien) {
  return {
    type: types.DELETE_EQUIPO_SUCCESS,
    id_bien
  };
}

export function updateSuccess(equipo) {
  return {
    type: types.UPDATE_EQUIPO_SUCCESS,
    equipo
  };
}
