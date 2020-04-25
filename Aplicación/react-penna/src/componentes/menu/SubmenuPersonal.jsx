var React = require('react');
import Card from './Card';
import Cards from './Cards';
import { connect } from 'react-redux';
import imgPersonal from '../../img/menu/personal.png';
import imgTecnico from '../../img/menu/tecnico.png';
import imgPuestoServicio from '../../img/menu/puesto-servicio.png';
import imgEntidad from '../../img/menu/entidad.png';

let menu=2 ;

let Submenu ={
        1:{url:"/personal/personal"          ,nombre:"Personal"    ,logo:imgPersonal},
        2:{url:"/personal/puesto_servicio"   ,nombre:"Servicio"    ,logo:imgPuestoServicio},
        3:{url:"/personal/tecnicos"          ,nombre:"Técnico"     ,logo:imgTecnico},
        4:{url:"/personal/entidades"         ,nombre:"Entidad"     ,logo:imgEntidad}
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

const SubmenuPersonal = (props) => {
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

export default connect(mapStateToProps)(SubmenuPersonal);
