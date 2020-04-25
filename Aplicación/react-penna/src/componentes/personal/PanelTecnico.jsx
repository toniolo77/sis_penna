var React = require('react');

import * as api from '../../api/tecnico_api';
import * as apiPersonal from '../../api/personal_api';
import { connect } from 'react-redux';
import store from '../../store';
import TableTecnicos from './TableTecnicos';
import {Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';
import SelectChosen from '../genericos/SelectChosen';
import {showMsg} from '../../api/msg_alert_api';

class PanelTecnico extends React.Component {
	constructor() {
      super();
	  this.state= {
		  validator :this.initValidator()
	  }
    }

	initValidator(){
		return {
			personal :{
				required : true,
				type     : "numeric"
		  	},
			entidad :{
				required : true,
				type     : "numeric"
		  	}
		};
	}

	resetValidator(){
		return {
			personal :{
				required : true,
				type     : "numeric",
				isValid  : true
		  	},
			entidad :{
				required : true,
				type     : "numeric"
		  	}
		};
	}

	componentDidMount(){
		api.getTecnicos();
		apiPersonal.getPersonal();
	}

	//Al cambiar el personal seleccionado busca las entidades que le faltan
	changePersonal(event){
		api.getTecnicoNoEntidad(this._legajo.value); //Obtiene las entidades que les falta a un técnico
	}

	callbackSubmit(){
		var promesa=api.addElemento(this._legajo.value,this._entidad.value);

		promesa.then( valor => {
			api.getTecnicos(this._legajo.value);
			api.getTecnicoNoEntidad(this._legajo.value); //Obtiene las entidades que les falta a un técnico
			// resetForm("form_tecnico");
			this.setState({validator:this.resetValidator()});
			showMsg("Se creo correctamente el tecnico","ok");
		});
    }
	_deleteElemento(tecnico){
		api.deleteElemento(tecnico);
    }

	_addElemento(event){
		event.preventDefault();

		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }



	render() {
	  return (
		<div className="col-md-6">
			<Formulario titulo="Creación Técnico" id="form_tecnico" submit={this._addElemento.bind(this)}>
				<div className="row">
					<SelectChosen
						label       = "Personal (*)"
						llave       = "legajo"
						valor       = {input => this._legajo = input}
						clearable   = {false}
						descripcion = "nombre_apellido"
						clases      = "col-md-6"
						onChange    = {this.changePersonal.bind(this)}
						data        = {this.props.personal}
						validator   = {this.state.validator.personal}
						cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{personal:p1})})}
					/>
					<SelectChosen
						label       = "Entidad (*)"
						llave       = "id_entidad"
						valor       = {input => this._entidad = input}
						clearable   = {false}
						descripcion = "nombre"
						clases      = "col-md-6"
						data        = {this.props.tecnicos_entidades}
						validator   = {this.state.validator.entidad}
						cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{entidad:p1})})}
					/>
					<div className="btn-form">
						<Boton
							label  = "Agregar técnico"
							icon   = "fa fa-wrench fa-lg"
							clases = "btn-success"
						/>
					</div>
				</div>
			</Formulario>
        	<TableTecnicos datos_elemento={this.props.tecnicos} deleteElemento={this._deleteElemento.bind(this)}/>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    tecnicos: store.tecnicoState.tecnicos,
	personal: store.personalState.personal,
	tecnicos_entidades: store.tecnicoState.tecnicos_entidades
  };
};

export default connect(mapStateToProps)(PanelTecnico);
