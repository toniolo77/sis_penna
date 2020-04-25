var React             = require('react');
var ReactBsTable      = require('react-bootstrap-table');
import {BootstrapTable,ExportCSVButton,TableHeaderColumn} from 'react-bootstrap-table';
import { connect } from 'react-redux';
import * as Api from '../../api/ordenes_api';
import * as BsTable from '../commons/BsTable';
import {estadoOrden,tipoBien,conformidad} from '../commons/Utils';
import {Boton,habilitarSubmit} from '../genericos/FormElements';
import {GenericModal} from '../genericos/GenericModal';
import SelectChosen from '../genericos/SelectChosen';
import {showMsg} from '../../api/msg_alert_api';
import {ModalBs} from '../genericos/ModalBs';
import {VerMasModal} from './templates/VerMasModal';

class TableOrdenesVer extends React.Component {
     constructor() {
       super();
       this.state = {
                       showModalVer      :false,
                       showModalFinalizar:false,
                       showModalCancelar :false,
                       datosOrden        :[],
                       validatorFinalizar: this.initValidatorFinalizarOrden()};
                 }

     initValidatorFinalizarOrden(){
         return {
             conformidad:{
                 required : true
             }
         }
     }

    customConfirm(next, dropRowKeys) {
        const dropRowKeysStr = dropRowKeys.join(',');
        if (confirm(`Está seguro que desea eliminar las fila seleccionada ${dropRowKeysStr}?`)) {
            next();
        }
    }

    colEstado(estado){
        let clase="";

        switch (parseInt(estado)) {
            case 1:
                clase='t-error';
                break;
            case 2:
                clase='t-orange';
                break;
            case 3:
                clase='t-ok';
                break;
        }
        return '<span class='+clase+'><b>'+estadoOrden[estado]+'</b></span>';
    }

    colTipoBien(tBien){
        return '<span>'+tipoBien[tBien]+'</span>';
    }

   colAccion(estado,row){
        var acciones=[];
        acciones.push(<Boton onClick={this.modalVerMas.bind(this,row)} clases="btn-primary" titulo="Ver datos adicionales de la orden de trabajo" icon="fa fa-search"></Boton>);
        switch (parseInt(row.estado)) {
            case 1://Pendiente
                acciones.push(<Boton onClick={this.modalCancelarOrden.bind(this,row)} clases="btn-danger" titulo="Cancelar orden de trabajo" icon="fa fa-times"></Boton>);
                break;
            case 3://Resuelta
                    acciones.push(<Boton onClick={this.modalFinalizarOrden.bind(this,row)} clases="btn-success" titulo="Dar conformidad y cerrar orden de trabajo" icon="fa fa-check"></Boton>);
                break;
        }
        return (
                <div>
                    {acciones.map((boton,i) =>
                         <span key={i}> {boton}</span>
                     )}
                </div>
        );
    }

    _dataConformidad(){
        var resultado = {};
        var resultado = Object.keys(conformidad).map((valor) =>{
            var elem  = [];
                elem      = {
                    conformidad     :valor,
                    descripcion:conformidad[valor]
                }
                return elem;
        });
        return resultado;
    }

    //Funciones del Modal "Ver más"
    modalVerMas(row){
         this.setState({showModalVer :!this.state.showModalVer});
         if (row!=null)
             this.setState({datosOrden : row});
    }

    //Funciones del modal cancelar orden
   modalCancelarOrden(row){
     this.setState({showModalCancelar :!this.state.showModalCancelar});
     if (row!=null)
         this.setState({datosOrden : row});
   }

    //Funciones del modal finalizar orden
   modalFinalizarOrden(row){
     this.setState({showModalFinalizar :!this.state.showModalFinalizar});
     if (row!=null)
         this.setState({datosOrden : row});
   }

    //Da por finalizada la orden de trabajo
    callbackFinalizarOrden(){
        var promesa = Api.putConformidadOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,conformidad:this._conformidad.value});

        promesa.then(valor => {
            this.props.getOrdenes();
            this.modalFinalizarOrden();
            showMsg("La orden de trabajo fue finalizada correctamente","ok");
            this.setState({validatorFinalizar:this.initValidatorFinalizarOrden()});
        });
    }

    //Valida los data y finaliza la orden
    finalizarOrden(){
        let obj = this.state.validatorFinalizar;
        habilitarSubmit(obj,this.callbackFinalizarOrden.bind(this));
    }

    //Cancelar la orden de trabajo
    cancelarOrden(){
        console.log("cancelar orden");
        var promesa = Api.actualizarEstadoOrden({id_orden_trabajo:this.state.datosOrden.id_orden_trabajo,estado:5});//Orden cancelada por el usuario

        promesa.then(valor => {
            this.props.getOrdenes();
            this.modalCancelarOrden();
            showMsg("La orden de trabajo fue cancelada correctamente","ok");
        });
    }


   render() {
        const opciones= {
                searchField           : BsTable.searchField,
                handleConfirmDeleteRow: this.customConfirm,
                clearSearch           : true,
                clearSearchBtn        : BsTable.btnClear,
                exportCSVBtn          : BsTable.btnXls,
                noDataText            : 'No se encontraron resultados'
        };

        var dataConformidad = this._dataConformidad();

        return (
                <div>
                    <ModalBs show={this.state.showModalFinalizar} onHide={this.modalFinalizarOrden.bind(this)} titulo="Solicitar">
                        <div className="modal-body">
                            <div className="form-group row">
                                <SelectChosen
                                    data={dataConformidad}
                                    llave="conformidad"
                                    descripcion="descripcion"
                                    label="Conformidad"
                                    valor={input => this._conformidad = input}
                                    validator   = {this.state.validatorFinalizar.conformidad}
                                    cambiar     = {p1    => this.setState({validatorFinalizar :Object.assign({}, this.state.validatorFinalizar,{conformidad:p1})})}
                                />
                                <div className="btn-form">
                                    <Boton
                                        onClick = {this.finalizarOrden.bind(this)}
                                        clases  = "btn-success"
                                        label   = "Cerrar orden"
                                        icon    = "fa fa-check"
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBs>

                    <VerMasModal datosOrden={this.state.datosOrden} show={this.state.showModalVer} onHide={this.modalVerMas.bind(this)}></VerMasModal>

                    <GenericModal
    					show   = {this.state.showModalCancelar}
    					onHide = {()=> {this.setState({showModalCancelar : false})}}
    					body   = "¿ Está seguro que desea cancelar la orden de trabajo?"
    					accion = {this.cancelarOrden.bind(this) }
    				/>
                    <BootstrapTable
                        height='auto'
                        search={true}
                        multiColumnSearch
                        data={this.props.datos_elemento}
                        deleteRow={false}
                        options={opciones}
                        hover
                        striped
                        pagination>
                        <TableHeaderColumn  dataField='id_bien' hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='id_tipo_bien' dataFormat={this.colTipoBien}>Tipo Bien</TableHeaderColumn>
                        <TableHeaderColumn dataField='descripcion'>Descripción</TableHeaderColumn>
                        <TableHeaderColumn dataField='servicio_nombre'>Servicio</TableHeaderColumn>
                        <TableHeaderColumn dataField='estado' dataFormat={this.colEstado} >Estado</TableHeaderColumn>
                        <TableHeaderColumn isKey dataField='id_orden_trabajo' dataFormat={this.colAccion.bind(this)} dataAlign="center" width="10%">Acción</TableHeaderColumn>
                    </BootstrapTable>
                </div>
         );
   }
}

export default TableOrdenesVer;
