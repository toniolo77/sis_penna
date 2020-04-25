import * as types from '../actions/action-types';

export function getTecnicosSuccess(elementos) {
  return {
    type: types.GET_TECNICOS_SUCCESS,
    elementos
  };
}

export function getPersonalSuccess(elementos) {
  return {
    type: types.GET_PERSONALTECNICO_SUCCESS,
    elementos
  };
}

export function getTecnicoNoEntidadSuccess(elementos) {
  return {
    type: types.GET_TECNICO_NO_ENTIDAD_SUCCESS,
    elementos
  };
}

export function getEntidadesTecnicoSuccess(elementos) {
  return {
    type: types.GET_ENTIDADES_TECNICO_SUCCESS,
    elementos
  };
}

export function getTecnicoEntidadFormSuccess(elementos) {
  return {
    type: types.GET_TECNICO_ENTIDAD_FORM,
    elementos
  };
}

export function getTecnicoEntidadTableSuccess(elementos) {
  return {
    type: types.GET_TECNICO_ENTIDAD_TABLE,
    elementos
  };
}

export function addSuccess(tecnico) {
  return {
    type: types.ADD_TECNICO_SUCCESS,
    tecnico
  };
}

export function deleteSuccess(tecnico) {
  return {
    type: types.DELETE_TECNICO_SUCCESS,
    tecnico
  };
}
