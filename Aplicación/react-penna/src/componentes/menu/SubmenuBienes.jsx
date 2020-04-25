var React = require('react');
import Card from './Card';
import Cards from './Cards';
import { connect } from 'react-redux';
import imgEquipo from '../../img/menu/equipo.png';
import imgPrestacion from '../../img/menu/prestacion.png';

let menu=3 ;

let Submenu ={
        1:{url:"/bienes/equipos"      ,nombre:"Equipos"      ,logo:imgEquipo},
        2:{url:"/bienes/prestaciones" ,nombre:"Prestaciones" ,logo:imgPrestacion}
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


const SubmenuBienes = (props) => {
      let subMenu = cargar_submenu(JSON.parse(props.permisos));
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

export default connect(mapStateToProps)(SubmenuBienes);
