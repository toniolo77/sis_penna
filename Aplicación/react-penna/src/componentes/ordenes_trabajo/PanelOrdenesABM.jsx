var React = require('react');

import * as Api from '../../api/ordenes_api';
import * as ApiServicio from '../../api/servicio_api';
import * as entidadApi from '../../api/entidad_api';
import { connect } from 'react-redux';
import store from '../../store';
import {Input2,Formulario,habilitarSubmit,resetForm,Boton} from '../genericos/FormElements';
import TableOrdenesABM from './TableOrdenesABM';
import {tipoBien,bienTipo} from '../commons/Utils';
import SelectChosen from '../genericos/SelectChosen';


class PanelOrdenes extends React.Component {
	constructor() {
      super();
	  this.state = {
		  			validator                : this.initValidator(),
		  			disabled_cod_patrimonial : false,
					id_tipo_bien             : bienTipo.EQUIPO,
					hideCodPatrimonial       :false
				};
    }

	//@todo cargar por defecto el servicio de login y todos los bienes que corresponden a servicio
	componentDidMount(){
		//id_servicio seria el del login
		ApiServicio.getServicios();
		Api.resetTabla();
		Api.getBienes({id_tipo_bien:this.state.id_tipo_bien,id_servicio:this._id_servicio.value});
		entidadApi.getEntidades();
	}

	initValidator(){
		return {
			id_servicio:{
				required : false
			},
			id_tipo_bien:{
				required : true
			},
			id_bien:{
				required : false
			},
			cod_patrimonial:{
				required : false
			}
		}
	}

	callbackSubmit(){
		this.setState({id_tipo_bien :this._id_tipo_bien.value});
		this.setState({hideCodPatrimonial :this._id_tipo_bien.value !=bienTipo['EQUIPO']});
		//[id_bien - id_tipo_bien]
		let id_bien = (this._id_bien.value).split("-");
		id_bien = id_bien[0];
		Api.getBienesTablas({
								id_tipo_bien   :this._id_tipo_bien.value,
								id_servicio    :this._id_servicio.value,
								id_bien        :id_bien,
								cod_patrimonial:this._cod_patrimonial.value
							});
	}

	_getBienesTablas(event){
		event.preventDefault();

		let obj = this.state.validator;
		habilitarSubmit(obj,this.callbackSubmit.bind(this));
    }

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

	changeSelect(event){
		// Habilita/Desabilita el input de cod_patrimonial
		this.setState({ disabled_cod_patrimonial: (this._id_tipo_bien.value == 2) ? true : false});

		//Para una prestación el servicio no es requerido
		// let servicio_requerido = (this._id_tipo_bien.value == 1) ? true : false;
		// console.log("required",servicio_requerido);
		// console.log("VALE 1",this.state.validator);
		// this.setState({validator.id_servicio :Object.assign({}, this.state.validator.id_servicio,{required : true})});

		if(!this.state.disabled_cod_patrimonial){
			this._cod_patrimonial.value = "";
		}
		Api.getBienes({
						id_tipo_bien:this._id_tipo_bien.value,
						id_servicio:this._id_servicio.value
					});
	}

	render() {
		var data_tipo_bienes = this._dataTipoBienes();
	  	return (
			<div className="col-md-10">
				<div className="col-md-8 center">
					<Formulario titulo="Nueva orden de trabajo" submit={this._getBienesTablas.bind(this)}>
						<div className="row">
							<SelectChosen
								label       = "Servicios"
								llave       = "id_servicio"
								descripcion = "nombre"
								clases      = "col-md-6"
								onChange    = {this.changeSelect.bind(this)}
								data        = {this.props.servicios}
								valor       = {input => this._id_servicio = input}
								validator   = {this.state.validator.id_servicio}
								cambiar     = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{id_servicio:p1})})}
							/>
						</div>
						<div className="row">
							<SelectChosen
								label       = "Tipo bien"
								llave       = "tipo_bien"
								descripcion = "descripcion"
								clases      = "col-md-5"
								clearable   = {false}
								defaultVal  = {this.state.id_tipo_bien}
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
							<Input2
								label    = "Cód. Patrimonial"
								clases   = "col-md-5"
								disabled = {this.state.disabled_cod_patrimonial}
								valor    = {input => this._cod_patrimonial = input}
								validator = {this.state.validator.cod_patrimonial}
								cambiar   = {p1    => this.setState({validator :Object.assign({}, this.state.validator,{cod_patrimonial:p1})})}
							 />
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
        			<TableOrdenesABM
						datos_elemento        = {this.props.bienes_tabla}
						entidades             = {this.props.entidades}
						hideCodPatrimonial = {this.state.hideCodPatrimonial}
					/>
				</div>
			</div>
      	);
    }
}


const mapStateToProps = function(store) {
  return {
	  bienes   	   : store.ordenesState.bienes,
	  bienes_tabla : store.ordenesState.datos_tabla,
	  servicios    : store.servicioState.servicios,
	  entidades    : store.entidadState.entidades
  };
};

export default connect(mapStateToProps)(PanelOrdenes);
