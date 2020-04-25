import * as types from '../actions/action-types';

export function getSuccess(personal) {
  return {
    type: types.GET_PERSONAL_SUCCESS,
    personal
  };
}

export function addSuccess(personal) {
  return {
    type: types.ADD_PERSONAL_SUCCESS,
    personal
  };
}

export function deleteSuccess(legajo) {
  return {
    type: types.DELETE_PERSONAL_SUCCESS,
    legajo
  };
}

export function updateSuccess(personal) {
  return {
    type: types.UPDATE_PERSONAL_SUCCESS,
    personal
  };
}
