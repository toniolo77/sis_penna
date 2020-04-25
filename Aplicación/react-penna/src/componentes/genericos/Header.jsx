var React = require('react');
require("../../styles/header.scss");
import logo from '../../img/fotor_penna2.png';

import * as ApiAutenticacion from '../../api/autenticacion_api';

let handleClick = (event) =>{
    event.preventDefault();
    ApiAutenticacion.logoutUser();
}

const Header = (props) => {
     const  usuario = localStorage.getItem("usuario");
      return (
        <header className="header-login-signup">
	        <div className="header-limiter">
	            <h1>
                    <img src={logo}/>
	                <span  className="white">Hospital Penna </span>
	            </h1>
	            <ul>
	                <li><a href="#">{usuario}</a></li>
	                <li  onClick={(event) => handleClick(event)}><a href="#">Salir</a></li>
	            </ul>
                <div className="clear"></div>
	        </div>
	    </header>
      );
}

export default Header
