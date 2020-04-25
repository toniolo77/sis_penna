var React = require('react');
import {ModalBs} from './ModalBs';
import {Boton} from './FormElements';

export const GenericModal = (props) => {
    return (
        <div>
            <ModalBs show={props.show} onHide={props.onHide} titulo="Confirmar">
                <div className="modal-body">
                    <div className="row">
                        {props.body}
                    </div>
                    <div className="botonera">
                        <div className="btn-form">
                            <Boton
                                label   = "Cancelar"
                                onClick = {props.onHide}
                                clases  = "btn-danger"
                                icon    = "fa fa-times"
                            />
                        </div>
                        <div className="btn-form">
                            <Boton
                                label   = "Aceptar"
                                onClick = {props.accion}
                                clases  = "btn-success"
                                icon    = "fa fa-check"
                            />
                        </div>
                    </div>
                </div>
            </ModalBs>
        </div>
    );
}
