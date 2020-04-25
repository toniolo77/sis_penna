var React = require('react');

import * as Api from '../../api/prestacion_api';
import * as ApiServicio from '../../api/servicio_api';
import { connect } from 'react-redux';
import store from '../../store';
import {Input2,PopOver,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';
import TablePrestacion from './TablePrestacion';
import {showMsg} from '../../api/msg_alert_api';
import SelectChosen from '../genericos/SelectChosen';



class PanelPrestacion extends React.Component {
	constructor() {
      	super();
	   	this.state = {validator :this.initValidator()};
    }

	initValidator(){
		return {
			id_servicio:{
				required : false
			},
			descripcion:{
				required : true
			},
			observacion:{
				required : false
			}
		}
	}

	componentDidMount(){
		Api.getPrestaciones();
		ApiServicio.getServicios();
	}

	callbackSubmit(){
		var promesa = Api.addPrestacion({
						descripcion :this._descripcion.value,
						id_servicio :this._id_servicio.value,
						observacion :this._observacion.value
					});

		promesa.then( valor => {
			Api.getPrestaciones({id_servicio:this._id_servicio.value});
			resetForm("form_prestacion");
			this.setState({validator:this.initValidator()});
			showMsg("La prestación fué creada correctamente","ok");
		});
	}

	_addElemento(event){
		event.preventDefault();
		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

	_deleteElemento(id){
		Api.deletePrestacion({id_bien:id});
    }
	_updateElemento(prestacion){
		Api.updatePrestacion({
							id_bien        :prestacion['id_bien'],
							descripcion    :prestacion['descripcion'],
							observacion    :prestacion['observacion'],
							id_servicio    :prestacion['id_servicio']
					});

		showMsg("La prestación fué modificada correctamente","ok");

	}

	//Obtiene los equipos pertenecientes al servicio seleccionado
	changeSelect(event){
		Api.getPrestaciones({id_servicio:this._id_servicio.value});
	}


	render() {
	  return (
		<div className="col-md-8">
			<div className="col-md-6 col-md-offset-3">
				<Formulario id="form_prestacion" titulo="Creación prestación" submit={this._addElemento.bind(this)}>
					<SelectChosen
						label       = "Servicio"
						llave       = "id_servicio"
						valor       = {input => this._id_servicio = input}
						descripcion = "nombre"
						onChange    = {this.changeSelect.bind(this)}
						data        = {this.props.servicios}
						validator   = {this.state.validator.id_servicio}
						cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
					/>
					<div className="row">
						<Input2
							label     = "Descripción (*)"
							clases    = "col-md-8"
							valor     = {input => this._descripcion = input}
							validator = {this.state.validator.descripcion}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{descripcion:p1})})}
						/>
					</div>
					<div className="row">
						<Input2
							label     = "Observación"
							clases    = "col-md-8"
							valor     = {input => this._observacion = input}
							validator = {this.state.validator.observacion}
							cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{observacion:p1})})}
						/>
					</div>
					<div className="btn-form">
						<div className="btn-form">
							<Boton
								label  = "Agregar prestación"
								icon   = "fa fa-lightbulb-o fa-lg"
								clases = "btn-success"
							/>
						</div>
					</div>
				</Formulario>
			</div>
			<div className="col-md-12">
				<TablePrestacion
					servicios={this.props.servicios}
					datos_elemento={this.props.prestaciones}
					updateElemento={this._updateElemento.bind(this)}
					deleteElemento={this._deleteElemento.bind(this)}/>
			</div>
		</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    prestaciones: store.prestacionState.prestaciones,
	servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelPrestacion);
