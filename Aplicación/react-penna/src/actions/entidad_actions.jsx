import * as types from '../actions/action-types';

export function getEntidadesSuccess(entidades) {
  return {
    type: types.GET_ENTIDADES_SUCCESS,
    entidades
  };
}

export function addEntidadSuccess(entidad) {
  return {
    type: types.ADD_ENTIDAD_SUCCESS,
    entidad
  };
}

export function deleteEntidadSuccess(id_entidad) {
  return {
    type: types.DELETE_ENTIDAD_SUCCESS,
    id_entidad,
	tipo_entidad
  };
}

export function updateEntidadSuccess(entidad) {
  return {
    type: types.UPDATE_ENTIDAD_SUCCESS,
    entidad
  };
}
