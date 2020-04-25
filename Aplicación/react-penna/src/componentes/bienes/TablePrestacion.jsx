var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as BsTable from '../commons/BsTable';

class TablePrestacion extends React.Component {
    constructor() {
        super();
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
        };

        return (
            <BootstrapTable
                height    = 'auto'
                search    = {true}
                data      = {this.props.datos_elemento}
                deleteRow = {true}
                selectRow = {BsTable.selectFila}
                cellEdit  = {editar}
                options   = {opciones}
                hover
                striped>
                <TableHeaderColumn
                    isKey
                    dataField='id_bien'
                    hidden>ID
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField='descripcion'
                    dataSort
                    columnTitle
                    editable={ { validator: BsTable.columnRequired } }
                    invalidEditColumnClassName={ BsTable.invalidClass }>Descripción
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataField='observacion'
                    dataSort
                    columnTitle
                    editable={ { validator: BsTable.columnRequired } }
                    invalidEditColumnClassName={ BsTable.invalidClass }>Observación
                </TableHeaderColumn>
                <TableHeaderColumn
                    editable={{
                        type: 'select',
                        options: { values: BsTable.addEditOption(this.props.servicios,"id_servicio","nombre"), textKey: 'nombre', valueKey: 'id_servicio' }
                          }}
                    dataFormat={BsTable.selectEditFormat.bind(this,this.props.servicios,"id_servicio","nombre")}
                    columnTitle
                    dataField='id_servicio'
                    dataSort>Servicio
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default TablePrestacion;
