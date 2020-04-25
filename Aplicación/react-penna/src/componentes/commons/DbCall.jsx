import axios from 'axios';
import store from '../../store';
import * as ApiAuth from '../../api/autenticacion_api';
import * as ApiMsg from '../../api/msg_alert_api';

//Crea un nuevo objecto sacando las campos que estan vacios
const removeEmpty = (obj) => {
  return Object.keys(obj).filter(key => obj[key]).reduce(
    (newObj, key) => {
      newObj[key] = obj[key]
      return newObj
    }, {}
  )
 }


export function DbCall(args) {
    const base_url='http://localhost:8000/api/';
    const token= localStorage.getItem('id_token');
    const params  =  (args.params == undefined) ? {} : removeEmpty(args.params);
    var promise = new Promise(function(resolve, reject) {
        axios({method: args.metodo,url:base_url+args.url,params: params,headers:{'Content-Type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${token}`}})
        .then(response => {

                if (response.data.success){
                    if (typeof args.callback != "undefined"){
                        if (typeof args.callbackParams == "undefined"){
                            store.dispatch(args.callback(response.data.result));
                        }
                        else{
                            store.dispatch(args.callback(args.callbackParams));
                        }
                    }
                    resolve(response.data);
                }
                else{
                    ApiMsg.showMsg(response.data.msg);
                    reject(response.data.msg);
                }
         })
         .catch(error => {
             console.log("error",error);
              switch (error.response.data.error) {
                case 'token_expired':
                      ApiAuth.logoutUser();
                      break
                 case 'token_not_provided':
                     ApiAuth.logoutUser();
                     break
              }
              reject(error.response.data.error);
            })
    });
    return promise;
}
