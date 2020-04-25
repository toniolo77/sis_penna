var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import { connect } from 'react-redux';
import * as Api from '../../api/ordenes_api';
import * as BsTable from '../commons/BsTable';
import {estadoOrden,tipoBien} from '../commons/Utils';
import {Boton,TextArea,habilitarSubmit} from '../genericos/FormElements';
import SelectChosen from '../genericos/SelectChosen';
import {showMsg} from '../../api/msg_alert_api'
import {ModalBs} from '../genericos/ModalBs';
import {VerMasModal} from './templates/VerMasModal';

class TableOrdenes extends React.Component {
	 constructor() {
       super();
	   this.state = {
		   			showModalVer       :false,
		   			showModalCrear     :false,
					datosOrden         :[],
					validatorCrearOrden: this.initValidatorCrearOrden()
				};
     }

	initValidatorCrearOrden(){
	   return {
		   observacion_creacion:{
			   required : true
		   },
		   entidad_destino:{
			   required : true
		   }
	   }
   }

	   colEstado(estado){
   			let clase="";

	   		 switch (estado) {
				 case "0":
					 clase='t-ok';
					 break;
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
   			return '<span class='+clase+' title="'+estadoOrden[estado]+'"><b>'+estadoOrden[estado]+'</b></span>';
   		}

	   colAccion(estado,row){
			var acciones=[];
			if(row.estado == "1" || row.estado=="2")
				acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" titulo="Ver datos adicionales de la orden de trabajo" icon="fa fa-search"></Boton>);
			else
				acciones.push(<Boton onClick={this.modalcrearOrden.bind(this,row)} clases="btn-success" titulo="Crear nueva orden de trabajo" icon="fa fa-plus"></Boton>);

			return (
					<div className="botonera">
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

	   modalcrearOrden(row){
		    this.setState({showModalCrear : true,  row :row});
	   }

	   cerrarCrear(){
		   	this.setState({showModalCrear : false});
	   }

		callbackSubmitCrearOrden(){
			var promesa = Api.addOrden({id_tipo_bien:this.state.row.id_tipo_bien,id_bien:this.state.row.id_bien,obs_creacion:this._observacion_creacion.value,
						'entidad_destino':this._id_entidad.value});

			promesa.then(valor => {
				Api.getBienesTablas({id_tipo_bien:this.state.row.id_tipo_bien,id_bien:this.state.row.id_bien});
				this.cerrarCrear();
				showMsg("La orden de trabajo fué creada correctamente","ok");
				this.setState({validatorCrearOrden:this.initValidatorCrearOrden()});
			});
		}

		crearOrden(){
			let obj = this.state.validatorCrearOrden;
			habilitarSubmit(obj,this.callbackSubmitCrearOrden.bind(this));
		}


   render() {

 		const opciones= {
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
 		};


		 return (
				<div>
					{/* Modal ver más */}
					<VerMasModal
						datosOrden = {this.state.datosOrden}
						show       = {this.state.showModalVer}
						onHide     = {this.modalVerMas.bind(this)}>
					</VerMasModal>

					{/* Modal crear orden */}
					<ModalBs
						show   = {this.state.showModalCrear}
						onHide = {this.cerrarCrear.bind(this)}
						titulo = "Nueva orden">
						<div>
							<TextArea
								label     = "Observación (*)"
								cols      = "50"
								rows      = "3"
								valor     = {input => this._observacion_creacion = input}
								validator = {this.state.validatorCrearOrden.observacion_creacion}
								cambiar   = {p1 => this.setState({validatorCrearOrden :Object.assign({}, this.state.validatorCrearOrden,{observacion_creacion:p1})})}
							/>
							<SelectChosen
								data        = {this.props.entidades}
								llave       = "id_entidad"
								descripcion = "nombre"
								label       = "Entidad Destino (*)"
								valor       = {input => this._id_entidad = input}
								validator   = {this.state.validatorCrearOrden.entidad_destino}
								cambiar     = {p1 => this.setState({validatorCrearOrden :Object.assign({}, this.state.validatorCrearOrden,{entidad_destino:p1})})}
							/>
							<div className="btn-form">
								<Boton
									label   = "Crear orden"
									onClick = {this.crearOrden.bind(this)}
									clases  = "btn-success"
									icon    = "fa fa-check"
								/>
							</div>
						</div>
					</ModalBs>

					<BootstrapTable
						height    = 'auto'
						search    = {true}
						multiColumnSearch
						data      = {this.props.datos_elemento}
						deleteRow = {false}
						options   = {opciones}
						hover
						striped
						pagination>
						<TableHeaderColumn
							isKey
							dataField='id_bien'
							hidden={true}>ID
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField = 'cod_patrimonial'
							hidden    = {this.props.hideCodPatrimonial}
							columnTitle>Cod Patrimonial
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='descripcion'
							dataSort
							columnTitle>Descripción
						</TableHeaderColumn>
						<TableHeaderColumn
							dataField='servicio_nombre'
							dataSort
							columnTitle>Servicio
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
							dataAlign  = "center"
							width      = "10%">Acción
						</TableHeaderColumn>
					</BootstrapTable>
				</div>
		 );
   }
}

export default TableOrdenes;
