var React = require('react');

import * as Api from '../../api/equipo_api';
import * as ApiServicio from '../../api/servicio_api';
import {connect} from 'react-redux';
import store from '../../store';
import {Input2,PopOver,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';
import {GenericModal} from '../genericos/GenericModal';
import TableEquipo from './TableEquipo';
import SelectChosen from '../genericos/SelectChosen';
import {showMsg} from '../../api/msg_alert_api';

class PanelEquipo extends React.Component {
	constructor() {
      super();
	  this.state = {validator :this.initValidator(),
	  				showGenericModal :{
						isVisible :false,
						id_equipo: ""}
					};
    }

	initValidator(){
		return {
			id_servicio:{
				required : true
			},
			descripcion:{
				required : true
			},
			observacion:{
				required : false
			},
			cod_patrimonial:{
				required : true,
				type     : "numeric"
			},
			id_equipo_padre:{
				required : false
			}
		}
	}
	resetValidator(){
		return {
			id_servicio:{
				required : true,
				isValid:true
			},
			descripcion:{
				required : true
			},
			observacion:{
				required : false
			},
			cod_patrimonial:{
				required : true,
				type     : "numeric"
			},
			id_equipo_padre:{
				required : false
			}
		}
	}

	componentDidMount(){
		Api.getEquipos();
		ApiServicio.getServicios();
	}

	callbackSubmit(){
		var promesa = Api.addEquipo({
						descripcion    :this._descripcion.value,
						observacion    :this._observacion.value,
						cod_patrimonial:this._cod_patrimonial.value,
						id_servicio    :this._id_servicio.value,
						id_equipo_padre:this._id_equipo_padre.value
					});

		promesa.then( valor => {
			if (valor['result'].length>=0) {
				if (valor['result'][0].estado=="alta"){
					showMsg("El código patrimonial ingresado ya existe","error");
				}
				else{
					this.setState({showGenericModal:{isVisible:true,
													id_equipo: valor['result'][0].id_equipo,
													cod_patrimonial: valor['result'][0].cod_patrimonial,
													descripcion: valor['result'][0].descripcion,
												}
								});
				}
			}
			else{
				Api.getEquipos({id_servicio:this._id_servicio.value});
				resetForm("form_equipo");
				this.setState({validator:this.resetValidator()});
				showMsg("El equipo fué creado correctamente","ok");
			}
		});
	}


	_addElemento(event){
		event.preventDefault();
		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

	_deleteElemento(id){
		Api.deleteEquipo({id_bien:id});
		showMsg("El equipo fué eliminado correctamente","ok");
    }

	_updateElemento(equipo){
		var promesa = Api.updateEquipo({
							id_bien         :equipo['id_bien'],
							cod_patrimonial :equipo['cod_patrimonial'],
							descripcion     :equipo['descripcion'],
							observacion     :equipo['observacion'],
							id_servicio     :equipo['id_servicio'],
							id_equipo_padre :equipo['id_equipo_padre']
					});

		promesa.then( valor => {
			showMsg("El equipo fué actualizado correctamente","ok");
		});
	}

	//Obtiene los equipos pertenecientes al servicio seleccionado
	changeSelect(event){
		Api.getEquipos({id_servicio:this._id_servicio.value});
	}

	_reactivarEquipo(){
		let equipo= {
			id_bien: this.state.showGenericModal.id_equipo

		}
		let promesa = Api.reactivarEquipo(equipo);
		promesa.then( valor => {
			showMsg("El equipo fué dado de alta nuevamente","ok");
			Api.getEquipos({id_servicio:this._id_servicio.value});
			this.setState({showGenericModal : {isVisible: false, id_equipo: ""}});
		});

	}


	render() {
	  return (
			<div className="col-md-10">
				<GenericModal
					show={this.state.showGenericModal.isVisible}
					onHide={()=> {this.setState({showGenericModal : {isVisible: false, id_equipo: ""}})}}
					body ={`El código patrimonial ${this.state.showGenericModal.cod_patrimonial} pertenece al equipo ${this.state.showGenericModal.descripcion} dado de baja. ¿Desea darlo de alta?`}
					accion={this._reactivarEquipo.bind(this) }
				/>
				<div className="col-md-5 center">
					<Formulario id="form_equipo" titulo="Creación equipo" submit={this._addElemento.bind(this)}>
						<SelectChosen
							label       = "Servicio (*)"
							llave       = "id_servicio"
							descripcion = "nombre"
							onChange    = {this.changeSelect.bind(this)}
							data        = {this.props.servicios}
							valor       = {input => this._id_servicio = input}
							validator   = {this.state.validator.id_servicio}
							cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
						/>
						<div className="row">
							<Input2
								label     = "Descripción (*)"
								valor     = {input => this._descripcion = input}
								clases    = "col-md-8"
								validator = {this.state.validator.descripcion}
								cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{descripcion:p1})})}
							/>
						</div>
						<div className="row">
							<Input2
								label     = "Observación"
								valor     = {input => this._observacion = input}
								clases    = "col-md-12"
								validator = {this.state.validator.observacion}
								cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{observacion:p1})})}
							/>
						</div>
						<div className="row">
							<Input2
								label     = "Código patrimonial (*)"
								valor     = {input => this._cod_patrimonial = input}
								clases    = "col-md-8"
								validator = {this.state.validator.cod_patrimonial}
								cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{cod_patrimonial:p1})})}
							/>
						</div>
						<SelectChosen
							label       = "Equipo Contenedor"
							llave       = "id_bien"
							valor       = {input => this._id_equipo_padre = input}
							descripcion = "cod_desc"
							data        = {this.props.equipos}
							validator   = {this.state.validator.id_equipo_padre}
							cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_equipo_padre:p1})})}
						/>
						<div className="btn-form">
							<Boton
								label  = "Agregar equipo"
								icon   = "fa fa-desktop fa-lg"
								clases = "btn-success"
							/>
						</div>
					</Formulario>
				</div>
				<div className="col-md-12">
					<TableEquipo
						datos_elemento={this.props.equipos}
						updateElemento={this._updateElemento.bind(this)}
						deleteElemento={this._deleteElemento.bind(this)}
						servicios ={this.props.servicios}
					/>
				</div>
			</div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
    equipos: store.equipoState.equipos,
	servicios: store.servicioState.servicios
  };
};

export default connect(mapStateToProps)(PanelEquipo);
