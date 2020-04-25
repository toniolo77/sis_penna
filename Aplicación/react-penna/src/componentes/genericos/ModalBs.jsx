var React = require('react');
var Modal = require("react-bootstrap/lib/Modal");
import {Boton} from './FormElements';

export const ModalBs = (props) => {
      return (
            <div>
    	        <Modal show={props.show} onHide={props.onHide}>
    				  <Modal.Header closeButton>
    					<Modal.Title>{props.titulo}</Modal.Title>
    				  </Modal.Header>
    				  <Modal.Body>
    					{props.children}
    				  </Modal.Body>
    			</Modal>
            </div>
      );
}

// export default ModalBs
