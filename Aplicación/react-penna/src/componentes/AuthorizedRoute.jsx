var React = require('react');
import store from '../store';
import { connect } from 'react-redux';
import { Route, Redirect,withRouter } from 'react-router-dom';

class AuthorizedRoute extends React.Component {
	constructor() {
      super();
    }


	render() {
        const aux= !this.props.autenticacion.isAuthenticated ? <Redirect to ="/auth"/> : <span>{this.props.children}</span>
	  return (
            <div>
               {aux}
           </div>
      );
    }
}


const mapStateToProps = function(store) {
  return {
	  autenticacion 	 : store.autenticacionState,
  };
};

export default withRouter(connect(mapStateToProps)(AuthorizedRoute));
