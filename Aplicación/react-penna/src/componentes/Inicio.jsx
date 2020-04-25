var React = require('react');
import { connect } from 'react-redux';
import * as ApiAutenticacion from '../api/autenticacion_api';

require("../styles/inicio.scss");
require("../styles/font-awesome-4.7.0/scss/font-awesome.scss");
import logo from '../img/fotor_penna2.png';


class Inicio extends React.Component {
	constructor() {
      super();
	  this.state = {showError:"hidden"};
    }


	handleClick(event) {
		event.preventDefault();
		const usuario = this.refs.usuario
		const password = this.refs.password
		const creds = { usuario: usuario.value.trim(), password: password.value.trim() }
		var promesa = ApiAutenticacion.loginUser(creds);
		promesa.then({},(reject) => {
			this.setState ( {showError : ""});
		});
	}

	render(){
		const randomClass = "img_" + Math.floor((Math.random() * 3) + 1);
		return (
				<div className={"inicio-penna " +randomClass}>
		            <div className="inner-bg">
		                <div className="container">
		                    <div className="row">
		                        <div className="col-sm-2 text text-center">
		                            <img src={logo}/>
		                            <h1><strong>SisPenna</strong></h1>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col-sm-6 text">
		                            <div className="description">
		                                <p>
		                                    Bienvenido al sistema de intranet del Hospital Interzonal Dr. José Penna
		                                </p>
		                            </div>
		                        </div>
		                        <div className="col-sm-4 col-sm-offset-2 form-box">
		                        	<div className="form-top">
		                        		<div className="form-top-left">
		                        			<h3>Ingresar a SisPenna</h3>
		                            		<p style={{whiteSpace: 'nowrap',marginTop: '20px'}}>Ingrese nombre de usuario y contraseña</p>
		                        		</div>
		                        		<div className="form-top-right">
		                        			<i className="fa fa-lock"></i>
		                        		</div>
		                            </div>
									<div className={"form-error "+ this.state.showError}>
										<strong>Nombre de usuario y/o contraseña incorrecta</strong>
									</div>
		                            <div className="form-bottom">
					                    <form role="form" action="" method="post" className="login-form">
					                    	<div className="form-group">
					                    		<label className="sr-only" >Usuario</label>
					                        	<input type="text" ref="usuario" name="form-username" placeholder="Usuario..." className="form-username form-control" id="form-username" />
					                        </div>
					                        <div className="form-group">
					                        	<label className="sr-only" >Contraseña</label>
					                        	<input type="password" ref="password" name="form-password" placeholder="Contraseña..." className="form-password form-control" id="form-password" />
					                        </div>
											<button onClick={(event) => this.handleClick(event)} className="btn-inicio">
												Ingresar
											</button>
											{this.props.autenticacion.errorMessage &&
												<p>{this.props.autenticacion.errorMessage}</p>
											}
					                    </form>
				                    </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		  );
	}
};

const mapStateToProps = function(store) {
  return {
	  autenticacion 	 : store.autenticacionState,
  };
};

export default connect(mapStateToProps)(Inicio);
