import axios from 'axios';
import store from '../../store';
import {requestLoginSuccess,receiveLoginSuccess,loginErrorSuccess} from '../../actions/autenticacion_actions';

export function CallUser(args) {
    const base_url='http://localhost:8000/api/';

	// We store.dispatch requestLogin to kickoff the call to the API
	store.dispatch(requestLoginSuccess(args.params));

    var promise = new Promise(function(resolve, reject) {

        axios({method: args.metodo,url:base_url+args.url,params: args.params,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(response => {
                if (response.data.success){
                  // If login was successful, set the token in local storage
		          localStorage.setItem('id_token', response.data.result.token);
		          localStorage.setItem('usuario', response.data.result.usuario.nombre);
                  localStorage.setItem('permisos', JSON.stringify(response.data.result.permisos));
		          // Dispatch the success action
		          store.dispatch(receiveLoginSuccess(response.data.result.token,JSON.stringify(response.data.result.permisos)));
                  resolve(1);
                }
                else{
                    store.dispatch(loginErrorSuccess(response.data.msg));
                    reject(response.data.msg);
                }
         })
          .catch(error => {
               switch (error.response.data.error) {
                 case 'token_expired':
                       ApiAuth.logoutUser();
                       break
                  case 'token_not_provided':
                      ApiAuth.logoutUser();
                      break
               }
               if(error.response.statusText=="Unauthorized"){
                   reject("Nombre de usuario y/o contraseña incorrecta");
               }
               reject(error.response.data.error);
             })
    });
    return promise;
}
