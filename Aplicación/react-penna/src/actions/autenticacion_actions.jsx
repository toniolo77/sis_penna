import * as types from '../actions/action-types';

export function requestLoginSuccess(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLoginSuccess(id_token,permisos) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: id_token,
    permisos: permisos
  }
}

export function loginErrorSuccess(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message:''
  }
}

export function requestLogout() {
  return {
    type: types.LOGOUT_SUCCESS
  }
}
