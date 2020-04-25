var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
import store from '../../store';
import * as Api from '../../api/ordenes_api';
import * as ApiTecnico from '../../api/tecnico_api';
import * as ApiEntidad from '../../api/entidad_api';
import * as BsTable from '../commons/BsTable';
import {estadoOrden,tipoBien,conformidad,prioridad} from '../commons/Utils';
import {Boton,TextArea,Label,Input2,habilitarSubmit} from '../genericos/FormElements';
import SelectChosen from '../genericos/SelectChosen';
import {ModalBs} from '../genericos/ModalBs';
import {GenericModal} from '../genericos/GenericModal';
import {VerMasModal} from './templates/VerMasModal';
import {showMsg} from '../../api/msg_alert_api'

class TableOrdenesAdmin extends React.Component {
	constructor() {
		super();
		this.state = {
						showModalVer        : false,
						showModalDerivar    : false,
						showModalAsignar    : false,
						showModalActualizar : false,
						showModalRechazar   : false,
						datosOrden          : [],
						validatorDerivar    : this.initValidatorDerivar(),
						validatorActualizar : this.initValidatorActualizar(),
						validatorAsignar    : this.initValidatorAsignar(),
						validatorRechazar   : this.initValidatorRechazar()

					};
	 }

	 componentDidMount(){
 		ApiEntidad.getEntidades();
 	}


	initValidatorDerivar(){
		 return {
			 id_entidad_destino:{
				 required : true
			 }
		 }
	}
	initValidatorActualizar(){
		return {
			prioridad:{
			   required : true
		   },
		   hs_insumidas:{
			   required:true,
			   type :"time"
		   },
		   obs_devolucion:{
			   required:false
		   }
	   }
	}


	initValidatorAsignar(){
	   return {
		   leg_recepcion:{
			   required : true
		   }
	   }
	}

	initValidatorRechazar(){
		return {
		   obs_devolucion:{
			   required:true
		   }
	   }
	}

	customConfirm(next, dropRowKeys) {
		const dropRowKeysStr = dropRowKeys.join(',');
		if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
			next();
		}
	}

	colEstado(estado,row){
		let clase=' ';

		 switch (String(row.estado)) {
			 case "1":
				 clase='t-error';
				 break;
			 case "2":
				 clase='t-orange';
				 break;
			 case "3":
				 clase='t-ok';
				 break;
		 }
		return '<span class="'+clase+'" title="'+estadoOrden[estado]+'"><b>'+estadoOrden[estado]+'</b></span>';
	  }

	colPrioridad(estado,row){
		let clase="";

		 switch (String(estado)) {
			 case "1":
			 	 clase='t-ok';
				 break;
			 case "2":
				 clase='t-orange';
				 break;
			 case "3":
			 	 clase='t-error';
				 break;
			 case "4":
			 	 clase='text-danger';
				 break;

		 }
		let textPrioridad = (prioridad[estado] == undefined) ? " " : prioridad[estado];
		return '<span class='+clase+' title="'+textPrioridad+'"><b>'+textPrioridad+'</b></span>';
	}

	colTipoBien(tBien,row){
	   return '<span class="">'+tipoBien[tBien]+'</span>';
	}

	colAccion(estado,row){
		let acciones=[];
		acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" titulo="Ver datos adicionales de la orden de trabajo" icon="fa fa-search"></Boton>)
		switch (String(row.estado)) {
			case "2"://En curso
					acciones.push(<Boton onClick={this.modalActualizarOrden.bind(this,row)} clases="btn-warning" titulo="Modificar los datos de la orden de trabajo" icon="fa fa-pencil"></Boton>);
			case "1"://Pendiente
					acciones.push(<Boton onClick={this.modalDerivarOrden.bind(this,row)}     clases="btn-info"    titulo="Derivar orden de trabajo" icon="fa fa-reply"></Boton>)
					acciones.push(<Boton onClick={this.modalAsignarOrden.bind(this,row)}     clases="btn-success" titulo="Asignar la orden a un técnico" icon="fa fa-plus"></Boton>)
					acciones.push(<Boton onClick={this.modalRechazarOrden.bind(this,row)}     clases="btn-danger" titulo="Rechazar orden de trabajo" icon="fa fa-times"></Boton>)
				break;
			case "3"://Resuelta
			case "4"://Finalizada
			case "5"://Cancelada por usuario
			case "6"://Cancelada por técnico


		}
		return (
				<div >
					{acciones.map((boton,i) =>
						 <span key={i}> {boton}</span>
					 )}
				</div>
		);

	}

	//Funciones del Modal "Ver más"
	modalVerMas(row){
		this.setState({showModalVer :!this.state.showModalVer});
		if (row!=null)
			this.setState({datosOrden : row});
	}

	//Muestra/Oculta el modal de derivar orden guardando los datos de la fila segun corresponda
	modalDerivarOrden(row=null){
		this.setState({showModalDerivar : !this.state.showModalDerivar});
		if (row!=null)
			this.setState({datosOrden : row});
	}

	//Muestra/Oculta el modal de actualizar orden guardando los datos de la fila segun corresponda
	modalActualizarOrden(row=null){
		this.setState({showModalActualizar : !this.state.showModalActualizar});
		 if (row!=null)
			 this.setState({datosOrden : row});

	}

	//Muestra/Oculta el modal de tomar orden guardando los datos de la fila segun corresponda
	modalAsignarOrden(row=null){
		if(!this.state.showModalAsignar){// Si se abre el modal de asignar
			const not_this=this;
			const prom = new Promise(function(resolve, reject) {
				not_this.setState({datosOrden : row});
				resolve(1);
			});
			prom.then(valor=>{
				const promesa= ApiTecnico.getTecnicoEntidadTable({id_entidad:this.state.datosOrden.id_entidad_destino});
				promesa.then(valor => {
					this.setState({showModalAsignar : !this.state.showModalAsignar});
				});
			});
		}
		else{
			this.setState({showModalAsignar : !this.state.showModalAsignar});
		}
	}

	//Funciones del modal rechazar orden
   modalRechazarOrden(row){
     this.setState({showModalRechazar :!this.state.showModalRechazar});
     if (row!=null)
         this.setState({datosOrden : row});
   }

	//Action generada al presionar el boton "derivar" en el modal
	derivarOrden(){
		let obj = this.state.validatorDerivar;
		habilitarSubmit(obj,this.callbackDerivarOrden.bind(this));
	}

	callbackDerivarOrden(){
		var promesa = Api.derivarOrden({
										id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,
										entidad_destino:this._entidad_destino.value
									});

		promesa.then(valor => {
			this.modalDerivarOrden();
			this.props.getOrdenes();
			showMsg("La orden de trabajo fué derivada correctamente a "+this._entidad_destino.label,"ok");

		});
	}

	//Valida los campos y llama al asignar orden
	asignarOrden(){
		let obj = this.state.validatorAsignar;
		habilitarSubmit(obj,this.callbackAsignarOrden.bind(this));
	}

	//Asigna la orden de trabajo a un técnico elegido
	callbackAsignarOrden(){
		var promesa = Api.asignarOrden({
										id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,
										leg_recepcion:this._leg_recepcion.value
									});

		promesa.then(valor => {
			this.props.getOrdenes();//Vuelvo a cargar la tabla
			this.modalAsignarOrden();//Oculto el model
			showMsg("La orden de trabajo fué asignada correctamente al legajo: "+this._leg_recepcion.value,"ok");
			this.setState({validatorAsignar:this.initValidatorAsignar()});
		});
	}

	//Valida los campos y llama para finalizar la orden
	finalizarOrden(){
		let obj = this.state.validatorActualizar;
		habilitarSubmit(obj,this.callbackFinalizarOrden.bind(this));
	}
	//Actualiza la orden de trabajo con los datos ingresados y cambiandole el estado a finalizado
	callbackFinalizarOrden(){
		const promesa=Api.finalizarOrden({
  								id_orden_trabajo: this.state.datosOrden.id_orden_trabajo,
  								hs_insumidas    : this._hs_insumidas.value,
  								prioridad       : this._prioridad.value,
  								obs_devolucion  : this._obs_devolucion.value

  							});
  		promesa.then(valor => {
				console.log("ENTRO PROMESA");
  				this.props.getOrdenes();//Vuelvo a cargar la tabla
  				this.modalActualizarOrden();//Oculto el model
				showMsg("Se dio por finalizada la orden de trabajo","ok");
				this.setState({validatorActualizar:this.initValidatorActualizar()});
  		 });
	}

	//Actualiza la orden de trabajo con los datos ingresados
	actualizarOrden(){
		let obj = this.state.validatorActualizar;
		habilitarSubmit(obj,this.callbackActualizarOrden.bind(this));
	}

	callbackActualizarOrden(){
		var promesa=Api.actualizarOrden({
								id_orden_trabajo: this.state.datosOrden.id_orden_trabajo,
								hs_insumidas    : this._hs_insumidas.value,
								prioridad       : this._prioridad.value,
								obs_devolucion  : this._obs_devolucion.value
							});
		promesa.then(valor => {
			this.props.getOrdenes();
			this.modalActualizarOrden();
			showMsg("La orden de trabajo se actualizó correctamente","ok");
			this.setState({validatorActualizar:this.initValidatorActualizar()});
		});
	}

	//Rechazar la orden de trabajo
    rechazarOrden(){
        var promesa = Api.rechazarOrden({//Orden cancelada por el técnico
											id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,
											obs_devolucion  :this._obs_devolucion.value
										});

        promesa.then(valor => {
            this.props.getOrdenes();
            this.modalRechazarOrden();
            showMsg("La orden de trabajo fue rechazada correctamente","ok");
        });
    }

	_dataPrioridades(){
		var resultado = {};
		var resultado = Object.keys(prioridad).map((valor) =>{
			var elem  = [];
				elem      = {
					prioridad  : valor,
					descripcion: prioridad[valor]
				}
				return elem;
		});
		return resultado;
	}

	_hsFloat(){
		let hsFloat = this.state.datosOrden.hs_insumidas;
		let hs      = Math.trunc(hsFloat);
		let min     = Math.round(((hsFloat - Math.floor(hsFloat))*60));
		if (min.toString().length==1)
			min="0"+min;
		return hs +":"+min;
	}

   render() {

		const opciones = {
			searchField           : BsTable.searchField,
			handleConfirmDeleteRow: this.customConfirm,
			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
		};

		let data_prioridades = this._dataPrioridades();
		// let horas = this._hsFloat(); // paso las hs en formato float a formato válido de hs
		return (
				<div>

					{/* Modal ver más */}
					<VerMasModal
						datosOrden = {this.state.datosOrden}
						show       = {this.state.showModalVer}
						onHide     = {this.modalVerMas.bind(this)}>
					</VerMasModal>

					{/* Modal derivar */}
					<ModalBs show={this.state.showModalDerivar} onHide={this.modalDerivarOrden.bind(this)} titulo="Solicitar">
						<div className="modal-body">
							<div className="form-group row">
								<SelectChosen
									label       = "Entidad destino"
									valor       = {input => this._entidad_destino = input}
									defaultVal  = {this.state.datosOrden.id_entidad_destino}
									data        = {this.props.entidades}
									llave       = "id_entidad"
									clearable   = {false}
									descripcion = "nombre"
									validator   = {this.state.validatorDerivar.id_entidad_destino}
									cambiar     = {p1    => this.setState({validatorDerivar :Object.assign({}, this.state.validatorDerivar,{id_entidad_destino:p1})})}
								/>
								<div className="btn-form">
									<Boton
										label="Derivar"
										onClick={this.derivarOrden.bind(this)}
										clases="btn-success"
									/>
								</div>
							</div>
						</div>
					</ModalBs>

					{/* Modal asignar */}
					<ModalBs show={this.state.showModalAsignar} onHide={this.modalAsignarOrden.bind(this)} titulo="Asignar" >
						<div className="modal-body">
							<div className="form-group row">
								<SelectChosen
									label       = "Asignar A"
									defaultVal  = {this.state.datosOrden.leg_recepcion}
									data        = {this.props.tecnicos_entidad_table}
									llave       = "legajo"
									descripcion = "nombre_apellido"
									valor       = {input => { this._leg_recepcion = input;}}
									validator   = {this.state.validatorAsignar.leg_recepcion}
									cambiar     = {p1    => this.setState({validatorAsignar :Object.assign({}, this.state.validatorAsignar,{leg_recepcion:p1})})}
								/>
								<div className="btn-form">
									<Boton
										label   = "Asignar"
										onClick = {this.asignarOrden.bind(this)}
										clases  = "btn-success"
									/>
								</div>
							</div>
						</div>
					</ModalBs>

					{/* Modal actualizar */}
					<ModalBs show={this.state.showModalActualizar} onHide={this.modalActualizarOrden.bind(this)} titulo="Actualizar orden de trabajo">
						<div className="modal-body">
							<div className="row">
								<SelectChosen
									label       = "Prioridad"
									clases      = "col-md-6"
									clearable   = {false}
									defaultVal  = {this.state.datosOrden.prioridad}
									data        = {data_prioridades}
									llave       = "prioridad"
									descripcion = "descripcion"
									valor       = {input => this._prioridad = input}
									validator   = {this.state.validatorActualizar.prioridad}
									cambiar     = {p1    => this.setState({validatorActualizar :Object.assign({}, this.state.validatorActualizar,{prioridad:p1})})}
								/>
							</div>
							<div className="row">
								<Input2
									label       = "Tiempo dedicado"
									clases      = "col-md-4"
									placeholder = "HH:mm"
									valor       = {input => this._hs_insumidas = input}
									validator   = {this.state.validatorActualizar.hs_insumidas}
									cambiar     = {p1 => this.setState({validatorActualizar :Object.assign({}, this.state.validatorActualizar,{hs_insumidas:p1})})}
								/>
								<Label
									label  = "Total hs"
									clases = "col-md-4"
									value  = {this._hsFloat()}
								/>
							</div>
							<div className="row">
								<TextArea
									label     = "Obs devolución"
									rows      = "3"
									clases    = "col-md-12"
									value     = {this.state.datosOrden.obs_devolucion}
									valor     = {input => this._obs_devolucion = input}
									validator = {this.state.validatorActualizar.obs_devolucion}
									cambiar   = {p1    => this.setState({validatorActualizar :Object.assign({}, this.state.validatorActualizar,{obs_devolucion:p1})})}
								/>
							</div>
							<div className="btn-form">
								<Boton
									label   = "Actualizar"
									onClick = {this.actualizarOrden.bind(this)}
									clases  = "btn-warning"
									icon    = "fa fa-check"
								/>
								<Boton
									label   = "Guardar y finalizar"
									onClick = {this.finalizarOrden.bind(this)}
									clases  = "btn-success"
									icon    = "fa fa-check"
								/>
							</div>
						</div>
					</ModalBs>

					{/* Modal rechazar orden */}
					<ModalBs show={this.state.showModalRechazar} onHide={this.modalRechazarOrden.bind(this)} titulo="Rechazar orden de trabajo">
						<div className="modal-body">
							<div className="row">
								<TextArea
									label     = "Obs devolución"
									rows      = "3"
									clases    = "col-md-12"
									value     = {this.state.datosOrden.obs_devolucion}
									valor     = {input => this._obs_devolucion = input}
									validator = {this.state.validatorRechazar.obs_devolucion}
									cambiar   = {p1    => this.setState({validatorRechazar :Object.assign({}, this.state.validatorActualizar,{obs_devolucion:p1})})}
								/>
							</div>
							<div className="btn-form">
								<Boton
									label   = "Rechazar orden"
									onClick = {this.rechazarOrden.bind(this)}
									clases  = "btn-success"
									icon    = "fa fa-check"
								/>
							</div>
						</div>
					</ModalBs>

					<BootstrapTable
						height    = 'auto'
						search    = {true}
						data      = {this.props.datos_elemento}
						deleteRow = {false}
						options   = {opciones}
						hover>
						<TableHeaderColumn isKey
							dataField='id_orden_trabajo'
							hidden>ID
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField  = 'id_tipo_bien'
							dataFormat = {this.colTipoBien}
							dataSort
							columnTitle>Tipo Bien
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='descripcion'
							columnTitle>Descripción
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='servicio_nombre'
							dataSort
							columnTitle>Servicio
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField  = 'prioridad'
							dataFormat = {this.colPrioridad}
							dataSort
							columnTitle>Prioridad
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField  = 'estado'
							dataFormat = {this.colEstado}
							dataSort
							columnTitle>Estado
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField  = 'id_orden_trabajo'
							dataFormat = {this.colAccion.bind(this)}
							dataAlign  = "center">Acción
						</TableHeaderColumn>
					</BootstrapTable>
				</div>
		 );
   }
}

const mapStateToProps = function(store) {
  return {
	  entidades              : store.entidadState.entidades,
	  tecnicos_entidad_table : store.tecnicoState.tecnicos_entidad_table
  };
};

export default connect(mapStateToProps)(TableOrdenesAdmin);
