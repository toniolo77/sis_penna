var React = require('react');
import {Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Api from '../../api/msg_alert_api';


class MessageAlert extends React.Component {
	constructor() {
      super();
    }

	closeMsg(){
		Api.hideMsg();
	}

	render() {
		let typeMsg ="";
		switch (this.props.msgAlert.typeMsg) {
			case 'error':
			case 'fail':
				typeMsg="danger";
			break;
			case 'success':
			case 'ok'     :
				typeMsg="success";
			break;
		}
		if (this.props.msgAlert.display_msg){
			setTimeout(function(){
				Api.hideMsg();
			},this.props.msgAlert.timeout);
			return (
					<div className="text-center alert-penna">
						<Alert bsStyle={typeMsg}>
					     {this.props.msgAlert.msg}
						 	<button type="button" onClick={this.closeMsg} className="close" data-dismiss="alert" aria-label="Close">
	    						<span aria-hidden="true">&times;</span>
	  						</button>
					  	</Alert>
					</div>
		      );
		 }
		 else {
		 	return null
		 }
	}
}

const mapStateToProps = function(store) {

  return {
	  msgAlert 	 : store.msgAlertState,
  };
};

 export default connect(mapStateToProps)(MessageAlert);
