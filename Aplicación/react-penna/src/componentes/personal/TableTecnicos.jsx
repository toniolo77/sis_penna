var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from '../commons/BsTable';

class TableTecnicos extends React.Component {
	 constructor() {
       super();
     }

	 onAfterDeleteRow(rowKeys){
		 for (var i = 0; i < rowKeys.length; i++){
			var tecnico= rowKeys[i].split(",");
			this.props.deleteElemento({legajo:tecnico[0],id_entidad:tecnico[1]});
		 }
	 }

	customConfirm(next, dropRowKeys) {
	  const dropRowKeysStr = dropRowKeys.join(',');
	  if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
	    next();
	  }
	}


   render() {
		const opciones= {
 			afterDeleteRow        : this.onAfterDeleteRow.bind(this),
 			deleteBtn             : BsTable.btnEliminar,
			searchField           : BsTable.searchField,
 			handleConfirmDeleteRow: this.customConfirm,
 			clearSearch           : true,
			clearSearchBtn        : BsTable.btnClear,
			noDataText            : 'No se encontraron resultados'
 		};

		 return (
			<BootstrapTable
				height='auto'
				search={true}
				multiColumnSearch
				data={this.props.datos_elemento}
				deleteRow={true}
				selectRow={BsTable.selectFila}
				options={opciones}
				hover
				striped
				pagination>
				<TableHeaderColumn
					isKey
					dataField='tecnico_key'
					hidden>key
				</TableHeaderColumn>
				<TableHeaderColumn
					dataField='legajo'
					editable={ { validator: BsTable.columnNumeric } }
					invalidEditColumnClassName={ BsTable.invalidClass }>Legajo
				</TableHeaderColumn>
				<TableHeaderColumn
					dataField='nombre_apellido'
					editable={ { validator: BsTable.columnRequired } }
					invalidEditColumnClassName={ BsTable.invalidClass }>Nombre
				</TableHeaderColumn>
				<TableHeaderColumn
					dataField='entidad'
					editable={ { validator: BsTable.columnRequired } }
					invalidEditColumnClassName={ BsTable.invalidClass }>Entidad
				</TableHeaderColumn>

			</BootstrapTable>
		 );
   }
}

export default TableTecnicos;
