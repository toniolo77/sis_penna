var React = require('react');
import {ModalBs} from '../../genericos/ModalBs';
import {Boton,Label} from '../../genericos/FormElements';
import {conformidad} from '../../commons/Utils';


const _hsFloat = (hs_insumidas) =>{
	if (hs_insumidas==undefined || hs_insumidas==""){
		return "00:00";
	}
	else{
		let hsFloat = hs_insumidas;
		let hs      = Math.trunc(hsFloat);
		let min     = Math.round(((hsFloat - Math.floor(hsFloat))*60));
		if (min.toString().length==1)
			min="0"+min;
		return hs +":"+min;
	}
}

export const VerMasModal = (props) => {

  return (
          <div>
			<ModalBs show={props.show} onHide={props.onHide} titulo="Detalles orden de trabajo">
				<div className="modal-body">
					<div className="row">
						<Label
                            label  = "Autor-orden"
                            clases = "col-md-6"
                            value  = {props.datosOrden.p_creacion}
                        />
						<Label
                            label="Fecha Creación"
                            clases="col-md-6"
                            value={props.datosOrden.fecha_creacion}
                        />
					</div>
					<div className="row">
						<Label
                            label  = "Entidad destino"
                            clases = "col-md-6"
                            value  = {props.datosOrden.entidad_destino}
                        />
						<Label
                            label  = "Tomado por"
                            clases = "col-md-6"
                            value  = {props.datosOrden.p_recepcion}
                        />
					</div>
					<div className="row">
						<Label
                            label = "Observación creación"
                            value = {props.datosOrden.obs_creacion}
                        />
						<Label
                            label = "Observación devolución"
                            value = {props.datosOrden.obs_devolucion}
                        />
					</div>
					<div className="row">
                        <Label
                            label = "Hs insumidas"
                            clases = "col-md-4"
                            value = {_hsFloat(props.datosOrden.hs_insumidas)}
                        />
						<Label
                            label = "Conformidad"
                            clases = "col-md-6"
                            value = {conformidad[props.datosOrden.conformidad]}
                        />
					</div>
					<div className="btn-form">
						<Boton
                            label   = "Cerrar"
                            onClick = {props.onHide}
                            clases  = "btn-primary"
                        />
					</div>
				</div>
			</ModalBs>
        </div>
		);
}
