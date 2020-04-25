
import axios from 'axios';
import store from '../store';
import * as CallUser from '../componentes/commons/CallUser';
import {requestLoginSuccess,receiveLoginSuccess,loginErrorSuccess,requestLogout} from '../actions/autenticacion_actions';

export function loginUser(creds) {
    var args={metodo:'post',
              url:'auth',
              params:creds
           };
    return CallUser.CallUser(args);
}

export function logoutUser() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('permisos');
    localStorage.removeItem('usuario');
    store.dispatch(requestLogout());
}
