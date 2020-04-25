var React = require('react');

import * as Api from '../../api/ordenes_api';
import * as ApiServicio from '../../api/servicio_api';
import * as ApiEntidad from '../../api/entidad_api';
import { connect } from 'react-redux';
import store from '../../store';
import {Input2,PopOver,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';
import TableOrdenesVer from './TableOrdenesVer';
import {tipoBien,estadoOrden} from '../commons/Utils';
import SelectChosen from '../genericos/SelectChosen';
import DatePicker from '../genericos/DatePicker';


class PanelOrdenes extends React.Component {
	constructor() {
      super();
	  this.state = {
		  			validator                : this.initValidator(),
		  			disabled_cod_patrimonial :false,
					id_tbien_def             : "1",
					id_serv_def              :"1"
				}; //@TODO después el id_servicio es el del usuario
    }

	//@todo cargar por defecto el servicio de login y todos los bienes que corresponden a servicio
	componentDidMount(){
		//id_servicio seria el del login
		ApiServicio.getServicios();
		Api.getBienes({id_tipo_bien:this.state.id_tbien_def,id_servicio:this.state.id_serv_def});
		ApiEntidad.getEntidades();
		Api.resetTabla();
	}

	initValidator(){
		return {
			id_servicio:{
				required : false
			},
			id_tipo_bien:{
				required : true,
				isValid : true
			},
			id_bien:{
				required : false
			},
			fecha_ini:{
				required : false
			},
			fecha_fin:{
				required : false
			},
			cod_patrimonial:{
				required : false
			},
			estado:{
				required : false
			},
		}
	}

	callbackSubmit(){
		let estados = [];
		if(this._estado.length){
			let aux     = this._estado;
			estados = Object.keys(aux).map((valor) =>{
				return aux[valor].value;
			});
		}
		//[id_bien - id_tipo_bien]
		let id_bien = (this._id_bien.value).split("-");
		id_bien = id_bien[0];
		let promesa=	Api.getOrdenes({
							id_tipo_bien   :this._id_tipo_bien.value,
							id_servicio    :this._id_servicio.value,
							id_bien        :id_bien,
							cod_patrimonial:this._cod_patrimonial.value,
							fecha_ini      :this._fecha_ini.value,
							fecha_fin      :this._fecha_fin.value,
							estado         :estados
					});

		// promesa.then((val)=> {console.log(val["msg"])})
	}
	getOrdenesTabla(){
		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

	//Arma los datos del select para los tipos de bienes
	_dataTipoBienes(){
		var resultado = {};
		var resultado = Object.keys(tipoBien).map((valor) =>{
				var elem  = [];
				elem      = {
								tipo_bien  :valor,
								descripcion:tipoBien[valor]
							}
				return elem;
			});

		return resultado;
	}

	//Arma los datos del select para los estados de las ordenes de trabajo excluyendo el estado disponible
	_dataEstados(){
		var resultado = {};
		var resultado = Object.keys(estadoOrden).map((valor) =>{
			var elem  = [];
				elem      = {
					estado     :valor,
					descripcion:estadoOrden[valor]
				}
				return elem;
		});
		//Elimino el estado Disponible
		resultado = resultado.splice(1);
		return resultado;
	}

	//Obtiene los bienes según el tipo bien seleccionado y deshabilita  el código patrimonial en caso de elegir un tipo servicio
	changeSelect(event){
		// Habilita/Desabilita el input de cod_patrimonial
		this.setState({ disabled_cod_patrimonial: this._id_tipo_bien.value == 2 ? true : false});

		if(!this.state.disabled_cod_patrimonial)
			this._cod_patrimonial.value = "";

		Api.getBienes({
						id_tipo_bien:this._id_tipo_bien.value,
						id_servicio:this._id_servicio.value
					});
	}

	render() {
		let data_tipo_bienes = this._dataTipoBienes();
		let data_estados = this._dataEstados();
	  	return (
			<div className="col-md-10">
				<div className="col-md-8 center">
					<Formulario titulo="Ver órdenes de trabajo" submit={(event)=>{ event.preventDefault();this.getOrdenesTabla()}}>
						<div className="row">
							<SelectChosen
								label       = "Servicios"
								llave       = "id_servicio"
								descripcion = "nombre"
								clases      = "col-md-6"
								clearable   = {true}
								onChange    = {this.changeSelect.bind(this)}
								data        = {this.props.servicios}
								valor       = {input => this._id_servicio = input}
								validator   = {this.state.validator.id_servicio}
								cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
							/>
							<SelectChosen
								llave       = "estado"
								descripcion = "descripcion"
								label       = "Estado"
								multi       = {true}
								clases      = "col-md-5"
								data        = {data_estados}
								valor       = {input => this._estado = input}
								validator   = {this.state.validator.estado}
								cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{estado:p1})})}
							/>
						</div>
						<div className="row">
							<SelectChosen
								label       = "Tipo bien"
								llave       = "tipo_bien"
								descripcion = "descripcion"
								clases      = "col-md-5"
								clearable   = {false}
								defaultVal  = {this.state.id_tbien_def}
								onChange    = {this.changeSelect.bind(this)}
								data        = {data_tipo_bienes}
								valor       = {input => this._id_tipo_bien = input}
								validator   = {this.state.validator.id_tipo_bien}
								cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_tipo_bien:p1})})}
							/>
							<SelectChosen
								label       = "Bien"
								llave       = "id_bien_tipo"
								descripcion = "descripcion"
								clases      = "col-md-7"
								onChange    = {this.changeSelect.bind(this)}
								data        = {this.props.bienes}
								valor       = {input => this._id_bien = input}
								validator   = {this.state.validator.id_bien}
								cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_bien:p1})})}
							/>
						</div>
						<div className="row">
							<DatePicker
								label     = "Fecha inicio (creación)"
								valor     = {input => this._fecha_ini = input}
								clases    = "col-md-5"
								validator = {this.state.validator.fecha_ini}
								cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{fecha_ini:p1})})}
							/>
							<DatePicker
								label     = "Fecha fin (creación)"
								valor     = {input => this._fecha_fin = input}
								clases    = "col-md-5"
								validator = {this.state.validator.fecha_fin}
								cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{fecha_fin:p1})})}
							/>
						</div>
						<div className="row">
							<Input2
								label     = "Cód. Patrimonial"
								clases    = "col-md-5"
								disabled  = {this.state.disabled_cod_patrimonial}
								valor     = {input => this._cod_patrimonial = input}
								validator = {this.state.validator.cod_patrimonial}
								cambiar   = {p1 => this.setState({validator :Object.assign({}, this.state.validator,{cod_patrimonial:p1})})}
							/>
						</div>
						<div className="row">
						</div>
						<div className="btn-form">
							<Boton
								label  = "Buscar"
								icon   = "fa fa-search fa-lg"
								clases = "btn-primary"
							/>
						</div>
					</Formulario>
				</div>
				<div className="col-md-12">
        			<TableOrdenesVer
						datos_elemento={this.props.ordenes_tabla}
						getOrdenes = {this.getOrdenesTabla.bind(this)}
					/>
				</div>
			</div>
      	);
    }
}


const mapStateToProps = function(store) {
  return {
	  bienes   	   : store.ordenesState.bienes,
	  ordenes_tabla : store.ordenesState.datos_tabla,
	  servicios    : store.servicioState.servicios,
	  entidades    : store.entidadState.entidades
  };
};

export default connect(mapStateToProps)(PanelOrdenes);
