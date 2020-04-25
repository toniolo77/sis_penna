var React = require('react');
import { connect } from 'react-redux';
import {Route,Redirect,Switch,withRouter } from 'react-router-dom'
import Container from './componentes/Container';
import servicio from './componentes/personal/PanelServicio';
import tecnicos from './componentes/personal/PanelTecnico';
import entidades from './componentes/personal/PanelEntidad';
import equipos from './componentes/bienes/PanelEquipo';
import prestaciones from './componentes/bienes/PanelPrestacion';
import personal from './componentes/personal/PanelPersonal';
import ordenes_ver from './componentes/ordenes_trabajo/PanelOrdenesVer';
import ordenes_abm from './componentes/ordenes_trabajo/PanelOrdenesABM';
import ordenes_admin from './componentes/ordenes_trabajo/PanelOrdenesAdmin';
import configuracion from './componentes/configuracion/PanelConfiguracion';
import submenuOrdenes from './componentes/menu/SubmenuOrdenes';
import submenuPersonal from './componentes/menu/SubmenuPersonal';
import submenuBienes from './componentes/menu/SubmenuBienes';
import submenuConfiguracion from './componentes/menu/SubmenuConfiguracion';

let SubmenuRoute = [
    [{path:"/ordenes" ,component:submenuOrdenes,exact:true},{path:"/ordenes/ver",component:ordenes_ver},{path:"/ordenes/abm",component:ordenes_abm },{path:"/ordenes/administrar" ,component:ordenes_admin }],
    [{path:"/personal" ,component:submenuPersonal,exact:true},{path:"/personal/personal" ,component:personal},{path:"/personal/puesto_servicio" ,component:servicio},{path:"/personal/tecnicos" ,component:tecnicos},{path:"/personal/entidades" ,component:entidades}],
    [{path:"/bienes" ,component:submenuBienes,exact:true},{path:"/bienes/equipos" ,component:equipos },{path:"/bienes/prestaciones" ,component:prestaciones }],
    [{path:"/configuracion" ,component:submenuConfiguracion,exact:true},{path:"/configuracion/mi_cuenta" ,component:configuracion }]
];



var cargar_rutas = (opc_habilitados) => {
    let habilitados=[];
	opc_habilitados.map(function(opcion){
		if(opcion.id_opcion!=0)
			 habilitados.push(SubmenuRoute[opcion.id_menu-1][opcion.id_opcion]);
	});
	opc_habilitados.map(function(opcion){
		if(opcion.id_opcion==0)
			 habilitados.push(SubmenuRoute[opcion.id_menu-1][opcion.id_opcion]);
	});
	return habilitados;

}


class RutasHabilitadas extends React.Component {
	render(){
        // console.log("EASDASD",typeof this.props.permisos);
        let rutas;
        if((typeof this.props.permisos) ==  'object')
            rutas = cargar_rutas(this.props.permisos);
        else
            rutas = cargar_rutas(JSON.parse(this.props.permisos));

	    return (
	        <Switch>
	            <Route exact path="/" component={submenuOrdenes} />
	            {
	                Object.keys(rutas).map( (elem,index) =>{
	                    return (
	                        <Route key={index} path={rutas[elem].path} exact={rutas[elem].exact} component={rutas[elem].component}  />
	                    )
	                })
	            }
	            <Redirect to="/ordenes"/>
	        </Switch>
	    );
	}
}



const mapStateToProps = function(store) {
  return {
    permisos: store.autenticacionState.permisos
  };
};

export default withRouter(connect(mapStateToProps)(RutasHabilitadas));
