var React = require('react');
import Card from './Card';
import Cards from './Cards';
import { connect } from 'react-redux';
import imgVerOrden from '../../img/menu/ver_orden.png';
import imgAdmin from '../../img//menu/orden_admin2.png';
import imgNuevaOrden from '../../img/menu/nueva_orden2.png';

let menu=1;

let Submenu ={
        1:{url:"/ordenes/ver"         ,nombre:"Ver órdenes"     ,logo:imgVerOrden},
        2:{url:"/ordenes/abm"         ,nombre:"Nueva Orden"     ,logo:imgNuevaOrden},
        3:{url:"/ordenes/administrar" ,nombre:"Administración"  ,logo:imgAdmin}
}

var cargar_submenu = (opc_habilitados) => {
    let habilitados = [];
    opc_habilitados.map(function(opcion){
        if (menu==opcion.id_menu && opcion.id_opcion!=0)
		    habilitados.push(Submenu[opcion.id_opcion]);
	});
	return habilitados;
}

var CardsHabilitados = (props) => {
      return (
          <ul className="cards col-md-12">
			{props.subMenu.map(function(card,index){
               return (
                   <Card key={index} url={card.url} nombre={card.nombre} logo={card.logo} />
               );
            })}
        </ul>
      );
}

const SubmenuOrdenes = (props) => {
    let aux;
    if((typeof props.permisos) ==  'object')
        aux = props.permisos;
    else
        aux = JSON.parse(props.permisos);

    let subMenu = cargar_submenu(aux);
      return (
            <Cards>
                <CardsHabilitados subMenu={subMenu}/>
            </Cards>
      );
}

const mapStateToProps = function(store) {
  return {
    permisos: store.autenticacionState.permisos
  };
};

export default connect(mapStateToProps)(SubmenuOrdenes);
