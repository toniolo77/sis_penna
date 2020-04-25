var React = require('react');

import * as servicioApi from '../../api/servicio_api';
import { connect } from 'react-redux';
import store from '../../store';
import TableServicio from './TableServicio';
import {showMsg} from '../../api/msg_alert_api';
import {Input2,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';

class PanelServicio extends React.Component {
	constructor() {
      super();
	  this.state= {
		  validator :this.initValidator()
		  }
	}

	initValidator(){
		return {
				nombre :{
					required : true
				}
			};
	}

	componentDidMount(){
		servicioApi.getServicios();
	}

	callbackSubmit(){
		var promesa = servicioApi.addServicio(this._nombre.value);

		promesa.then( valor => {
			servicioApi.getServicios();
			resetForm("form_servicio");
			this.setState({validator:this.initValidator()});
			showMsg("Se creo correctamente el servicio","ok");
		});
	}

	_addElemento(event){
		event.preventDefault();

		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

	_deleteServicio(id){
		servicioApi.deleteServicio(id);
    }
	_updateServicio(servicio){
		var promesa =servicioApi.updateServicio(servicio);
		promesa.then( valor => {
			showMsg("Se actualizo correctamente el servicio","ok");
		});
	}

	render() {
	  return (
		<div className="col-md-5">
			<Formulario titulo="Creación servicio" id="form_servicio" submit={this._addElemento.bind(this)}>
				<div className="row">
					<Input2
						clases="form-group col-md-6"
						name="nombre"
						validator={this.state.validator.nombre}
						label="Nombre (*)" 
						valor={input => this._nombre = input}
						cambiar={p1 =>this.setState({validator :Object.assign({}, this.state.validator,{nombre:p1})})}
					/>
					<div className="btn-form">
						<Boton
							label  = "Agregar servicio"
							icon   = "fa fa-medkit fa-lg"
							clases = "btn-success"
						/>
					</div>
				</div>
			</Formulario>
        	<TableServicio datos_elemento={this.props.servicios} updateServicio={this._updateServicio.bind(this)} deleteServicio={this._deleteServicio.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelServicio);
