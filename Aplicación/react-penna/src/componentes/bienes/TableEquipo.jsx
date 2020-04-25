var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
var BootstrapTable    = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
import * as Api from '../../api/equipo_api';
import * as BsTable from '../commons/BsTable';
import {showMsg} from '../../api/msg_alert_api'


class TableEquipo extends React.Component {
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
        //Controlo que el equipo no tenga hijos
        let promesa = Api.getPadres({id_bienes:dropRowKeys});
        promesa.then(function(padres){
            if(padres.length){

                let padresDesc = Object.keys(padres).reduce(function(valorAnterior,valorAct){
                        if(!valorAct){// En la 1era iteración no entra
                            return valorAnterior +","+padres[valorAct]["padre_descripcion"];
                        }
                        return padres[valorAct]["padre_descripcion"];
                },"");
                showMsg("No es posible eliminar, los siguientes equipos tienen padres: "+padresDesc,"error");
            }
            else{
                BsTable.genericCustomConfirm(next,dropRowKeys);
            }
        });
    }

    // agregarOption(opciones,key,value){
    //     opciones.unshift({id_servicio: null ,nombre: "Ninguno"});
    //     return opciones;
    // }

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
                    dataField='id_tipo_equipo'
                    hidden>Tipo equipo
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
                    dataField='cod_patrimonial'
                    dataSort
                    columnTitle
                    editable={ { validator: BsTable.columnRequired } }
                    invalidEditColumnClassName={ BsTable.invalidClass }>Cód. patrimonial
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
                    editable={{
                        type: 'select',
                        options: { values: BsTable.addEditOption(this.props.datos_elemento,"id_bien","cod_desc"), textKey: 'cod_desc', valueKey: 'id_bien' }
                          }}
                    dataFormat={BsTable.selectEditFormat.bind(this,this.props.datos_elemento,"id_bien","cod_desc")}
                    columnTitle
                    dataField='id_equipo_padre'
                    dataSort>Equipo contenedor
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default TableEquipo;
