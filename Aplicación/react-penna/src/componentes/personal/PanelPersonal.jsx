var React = require('react');

import * as ApiPersonal from '../../api/personal_api';
import * as ApiServicio from '../../api/servicio_api';
import * as ApiPuesto from '../../api/puesto_api';
import { connect } from 'react-redux';
import store from '../../store';
import DatePicker from '../genericos/DatePicker';
import SelectChosen from '../genericos/SelectChosen';
import {Input2,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';
import {showMsg} from '../../api/msg_alert_api';
import TablePersonal from './TablePersonal';

class PanelPersonal extends React.Component {
	constructor() {
      super();
	  this.state= {
		  validator :this.initValidator()
	  }
    }

	initValidator(){
		return {
			legajo :{
				required : true,
				type     : "numeric"
		  	},
		  	usuario :{
				required : true
		  	},
		  	dni :{
				required : true,
				type     : "numeric"
		  	},
		  	nombre :{
				required : true
		  	},
		  	apellido :{
				required : true
		  	},
		  	fecha_ingreso :{
				required : true
		  	},
			id_servicio : {
		  		required : true
			}
		};
	}

	resetValidator(){
		return {
			legajo :{
				required : true,
				type     : "numeric"
		  	},
		  	usuario :{
				required : true
		  	},
		  	dni :{
				required : true,
				type     : "numeric"
		  	},
		  	nombre :{
				required : true
		  	},
		  	apellido :{
				required : true
		  	},
		  	fecha_ingreso :{
				required : true
		  	},
			id_servicio : {
		  		required : true,
				isValid:true
			}
		};
	}


	componentDidMount(){
		ApiPersonal.getPersonal();
		ApiServicio.getServicios();
	}

	callbackSubmit(){
		//Verifica si ya existe el cliente ingresado
		let promesa_existe= ApiPersonal.existePersonal({legajo: this._legajo.value,usuario: this._usuario.value,dni: this._dni.value });

		promesa_existe.then (res =>{
			if(res['result']==true){
				showMsg(res['msg'],"error");
			}
			else{ //Si los datos no existe agrega el personal
				let promesa = ApiPersonal.addPersonal({
														legajo       : this._legajo.value,
														usuario      : this._usuario.value,
														id_servicio  : this._id_servicio.value,
														dni          : this._dni.value,
														nombre       : this._nombre.value,
														apellido     : this._apellido.value,
														fecha_ingreso: this._fecha_ingreso.value
													});

				promesa.then( valor => {
					ApiPersonal.getPersonal();
					resetForm("form_personal");
					this.setState({validator:this.resetValidator()});
					showMsg("Se creo el personal correctamente","ok");
				});
			}
		});
	}

	_addElemento(event){
		event.preventDefault();
		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }


	_deleteElemento(legajo){
		let promesa =ApiPersonal.deletePersonal(legajo);
		promesa.then( valor => {
			showMsg("Se dio de baja el personal con legajo " + legajo,"ok");
		});
    }
	_updateElemento(personal){
		let promesa =ApiPersonal.updatePersonal(personal);
		promesa.then( valor => {
			showMsg("El cambio fué realizado correctamente","ok");
		})
	}

	render() {
	  return (
		<div className="col-md-10">
			<div className="col-md-6 col-md-offset-3">
				<Formulario titulo="Creación Personal" id="form_personal" submit={this._addElemento.bind(this)}>
					<div className="row">
						<Input2
							label     = "Legajo"
							valor     = {input => this._legajo = input}
							clases    = "col-md-4"
							validator = {this.state.validator.legajo}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{legajo:p1})})}
						/>
						<Input2
							label     = "Usuario"
							valor     = {input => this._usuario = input}
							clases    = "col-md-4"
							validator = {this.state.validator.usuario}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{usuario:p1})})}
						/>
						<Input2
							label     = "DNI"
							valor     = {input => this._dni = input}
							clases    = "col-md-4"
							validator = {this.state.validator.dni}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{dni:p1})})}
						/>
					</div>
					<div className="row">
						<Input2
							label     = "Nombre"
							valor     = {input => this._nombre = input}
							clases    = "col-md-4"
							validator = {this.state.validator.nombre}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{nombre:p1})})}
						/>
						<Input2
							label     = "Apellido"
							valor     = {input => this._apellido = input}
							clases    = "col-md-4"
							validator = {this.state.validator.apellido}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{apellido:p1})})}
						/>
						<DatePicker
							label     = "Fecha Ingreso"
							valor     = {input => this._fecha_ingreso = input}
							clases    = "col-md-4"
							validator = {this.state.validator.fecha_ingreso}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{fecha_ingreso:p1})})}
						/>
					</div>
					<div className="row">
						<SelectChosen
							label       = "Servicio"
							llave       = "id_servicio"
							valor       = {input => this._id_servicio = input}
							descripcion = "nombre"
							clases      = "col-md-6"
							data        = {this.props.servicios}
							validator   = {this.state.validator.id_servicio}
							cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
						/>
					</div>
					<div className="btn-form">
						<Boton
							label  = "Agregar personal"
							icon   = "fa fa-user-md fa-lg"
							clases = "btn-success"
						/>
					</div>
				</Formulario>
			</div>
			<div className="col-md-12">
        		<TablePersonal
					datos_elemento={this.props.personal}
					servicios={this.props.servicios}
					getPersonal={ApiPersonal.getPersonal}
					updateElemento={this._updateElemento.bind(this)}
					deleteElemento={this._deleteElemento.bind(this)}/>
			</div>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
	return {
		personal : store.personalState.personal,
		servicios: store.servicioState.servicios
	};
};

export default connect(mapStateToProps)(PanelPersonal);
