var React = require('react');

import * as configuracionApi from '../../api/configuracion_api';
import {showMsg} from '../../api/msg_alert_api';
import {Input2,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';

class PanelConfiguracion extends React.Component {
    constructor() {
      	super();
		this.state= {
			validator : this.initValidator()
		}
	}

	initValidator(){
		return {
			passAnterior :{
			  required : true
			},
			passNueva :{
			   required : true
		   },
			passNuevaCheck :{
				required : true
			}
		}
	}
    componentDidMount(){
    }

    callbackSubmit(){

        if(this._passNueva.value != this._passNuevaCheck.value){
            showMsg("Las contraseñas ingresadas deben ser iguales","error");
            return;
        }
        var promesa = configuracionApi.updatePassword({password_anterior:this._passAnterior.value,password:this._passNueva.value});

        promesa.then( valor => {
            resetForm("form_configuracion");
            this.setState({validator:this.initValidator()});
            showMsg("La contraseña fué actualizada correctamente","ok");
        });
    }

    _updatePassword(event){
        event.preventDefault();

        let obj = this.state.validator;
        habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

    render() {
      return (
        <div className="col-md-3">
            <Formulario titulo="Configuración" id="form_configuracion" submit={this._updatePassword.bind(this)}>
                <div className="row">
                    <Input2
                        label="Contraseña anterior (*)"
						clases="form-group col-md-12"
						validator={this.state.validator.passAnterior}
                        type="password"
						valor={input => this._passAnterior = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{passAnterior:p1})})}
					/>
				</div>
				<div className="row">
                    <Input2
                        label="Contraseña nueva (*)"
						clases="form-group col-md-12"
						validator={this.state.validator.passNueva}
                        type="password"
						valor={input => this._passNueva = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{passNueva:p1})})}
					/>
                </div>
                <div className="row">
                    <Input2
                        label="Repetir nueva contraseña (*)"
						clases="form-group  col-md-12"
						validator={this.state.validator.passNuevaCheck}
                        type="password"
						valor={input => this._passNuevaCheck = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{passNuevaCheck:p1})})}
					/>
                </div>
                <div className="btn-form">
                    <Boton
                        label  = "Cambiar contraseña"
                        icon   = "fa fa-gears fa-lg"
                        clases = "btn-success"
                    />
                </div>
            </Formulario>
        </div>
      );
    }
}




export default (PanelConfiguracion);
