var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import {Boton} from '../genericos/FormElements';
import {ModalBs} from '../genericos/ModalBs';
import {showMsg} from '../../api/msg_alert_api';
import * as BsTable from '../commons/BsTable';
import * as ApiConfiguracion from '../../api/configuracion_api';
import {GenericModal} from '../genericos/GenericModal';


class TablePersonal extends React.Component {
	 constructor() {
       super();
	   this.state = {showResetPass:false,datosPersonal:[]};
     }

	onAfterDeleteRow(rowKeys){
		for (var i = 0; i < rowKeys.length; i++)
			this.props.deleteElemento(rowKeys[i]);

	}
   updateElemento(row, cellName, cellValue) {
		   this.props.updateElemento(row);
   }
   customConfirm(next, dropRowKeys) {
	 const dropRowKeysStr = dropRowKeys.join(',');
	 if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	   next();
	 }
   }

	//Resetea la contraseña de un usuario que toma del state
   resetPassword(){
	   var promesa =ApiConfiguracion.resetPassword({usuario: this.state.datosPersonal.usuario});
	   promesa.then(valor => {
		   this.modalResetPass();
			showMsg("Se reseteo la contraseña del usuario " + this.state.datosPersonal.usuario,"ok");
	   });
   }

	//Renderiza el boton para resetear la contraseña
   colResetPassword(cell,row){
	    return <Boton onClick={this.modalResetPass.bind(this,row)} clases="btn-success" titulo="Resetear password" label="Reset Pass"></Boton>;
   }

	//Muestra y oculta el modal para resetear la contraseña guardando en el state los datos del usuario
   modalResetPass(row){
	 this.setState({showResetPass :!this.state.showResetPass});
	 if (row!=null)
		 this.setState({datosPersonal : row});
   }

   render() {
 	    const editar = {
 			mode         : 'dbclick',
 			blurToSave   : true,
 			afterSaveCell: this.updateElemento.bind(this)
 	   	};

	 	const opciones= {
			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
			deleteBtn             : BsTable.btnEliminar,
			searchField           : BsTable.searchField,
			handleConfirmDeleteRow: this.customConfirm,
			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
		}
		 const bodyModal = this.state.datosPersonal.usuario;

		 return (
			<div>
				<GenericModal
					show={this.state.showResetPass}
					onHide={this.modalResetPass.bind(this)}
					body   = {"¿ Desea resetear la contraseña  de "+bodyModal+" ?"}
					accion = {this.resetPassword.bind(this)}
				/>

				<BootstrapTable
					height    = 'auto'
					search    = {true}
					multiColumnSearch
					data      = {this.props.datos_elemento}
					deleteRow = {true}
					selectRow = {BsTable.selectFila}
					cellEdit  = {editar}
					options   = {opciones}
					hover
					striped
					pagination>
					<TableHeaderColumn
						isKey
						dataField='legajo'
						editable={ { validator: BsTable.columnNumeric } }
						invalidEditColumnClassName={ BsTable.invalidClass }>Legajo
					</TableHeaderColumn>
					<TableHeaderColumn
						dataField='usuario'
						editable={ { validator: BsTable.columnRequired } }
						invalidEditColumnClassName={ BsTable.invalidClass }>Usuario
					</TableHeaderColumn>
					<TableHeaderColumn
						dataField='dni'
						editable={ { validator: BsTable.columnNumeric } }
						invalidEditColumnClassName={ BsTable.invalidClass }>DNI
					</TableHeaderColumn>
					<TableHeaderColumn
						dataField='nombre'
						editable={ { validator: BsTable.columnRequired } }
						invalidEditColumnClassName={ BsTable.invalidClass }>Nombre
					</TableHeaderColumn>
					<TableHeaderColumn
						dataField='apellido'
						editable={ { validator: BsTable.columnRequired } }
						invalidEditColumnClassName={ BsTable.invalidClass }>Apellido
					</TableHeaderColumn>
	                <TableHeaderColumn
	                    editable={{
	                        type: 'select',
	                        options: { values: this.props.servicios, textKey: 'nombre', valueKey: 'id_servicio' }
	                          }}
	                    dataFormat={BsTable.selectEditFormat.bind(this,this.props.servicios,"id_servicio","nombre")}
	                    columnTitle
	                    dataField='id_servicio'
	                    dataSort>Servicio
	                </TableHeaderColumn>
					<TableHeaderColumn
						dataField='fecha_ingreso'
						editable={ { validator: BsTable.columnDate } }
						invalidEditColumnClassName={ BsTable.invalidClass }>Fecha ingreso
					</TableHeaderColumn>
					<TableHeaderColumn
						dataField="reset_pass"
						dataFormat={this.colResetPassword.bind(this)}>Reset Password
					</TableHeaderColumn>
				</BootstrapTable>
			</div>
		 );
   }
}

export default TablePersonal;
