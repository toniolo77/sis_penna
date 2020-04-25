var React = require('react');
import {Link} from 'react-router-dom';
require("../../styles/nuevo_menu.scss");


var tabData = {
	1:{ to:"/ordenes"		, nombre:"Ordenes de Trabajo"	, isActive:true },
	2:{ to:"/personal"		, nombre:"Personal"				, isActive:false},
	3:{ to:"/bienes"		, nombre:"Bienes"				, isActive:false},
	4:{ to:"/configuracion"	, nombre:"Configuración"		, isActive:false}
};

var cargar_menu = (props) => {
	let menu_habilitados= localStorage.getItem('permisos') ? JSON.parse(localStorage.getItem('permisos')) : [];
	let menu = [];
	menu_habilitados.forEach(function(menu_hab){
		if (menu_hab.id_opcion==0) //Habilita el tab menu si el id_opcion=0
			menu.push(tabData[menu_hab.id_menu])
	});
	return menu;
}

var Tabs = (props) => {
	 let menu = cargar_menu();
      return (
        <ul className="menu nav nav-tabs">
			 {menu.map(function(tab){
			 	return (
			 		<Tab data={tab} key={tab.nombre} icon={tab.icon} to={tab.to} isActive={props.activeTab===tab} handleClick={props.changeTab.bind(this,tab)}/>
			 	);
			 }.bind(this))}
		</ul>
      );
}

var Tab = (props) => {
	  return (
        <li onClick={props.handleClick} className={props.isActive ? "active" : null}>
			<Link to={props.to}>{props.icon}<span className="izquierda">{props.data.nombre}</span></Link>
		</li>
      );
}


class Menu extends React.Component {
	constructor() {
      super();
	  this.state={
		  activeTab: tabData[0]
	  }
    }

	handleClick(tab){
		this.setState({activeTab:tab});
	}

	render() {
		return (
			<nav>
				<Tabs  activeTab={this.state.activeTab} changeTab={this.handleClick.bind(this)}/>
			</nav>
		);
	}
}

export default Menu;
