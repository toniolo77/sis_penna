import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 tecnicos: [],
 tecnico_personal: [], //Son los datos del tecnico seleccionado
 tecnicos_entidades: [],
 tecnicos_entidad_table: [], //Utilizado para el table de Admin
 tecnicos_entidad_form: [], //Utilizado para el form de Admin
 entidades_tecnico : [] //Las entidades que tiene asignada el técnico conectado
};

const tecnicoReducer = function(state = initialState, action) {
  switch(action.type) {
    case types.GET_TECNICOS_SUCCESS:
        return Object.assign({}, state, { tecnicos: action.elementos });

    case types.GET_PERSONALTECNICO_SUCCESS:
        return Object.assign({}, state, { tecnico_personal: action.elementos[0] });

    //Obtiene todas las entidades a las que no pertenece el empleado con el legajo ingresado
    case types.GET_TECNICO_NO_ENTIDAD_SUCCESS:
          return Object.assign({}, state, { tecnicos_entidades: action.elementos });

    ////Obtiene los distintos técnicos filtrados según la entidad
    case types.GET_TECNICO_ENTIDAD_FORM:
          return Object.assign({}, state, { tecnicos_entidad_form: action.elementos });

    ////Obtiene los distintos técnicos filtrados según la entidad
    case types.GET_TECNICO_ENTIDAD_TABLE:
          return Object.assign({}, state, { tecnicos_entidad_table: action.elementos });

    case types.GET_ENTIDADES_TECNICO_SUCCESS:
          return Object.assign({}, state, { entidades_tecnico: action.elementos });


    case types.ADD_TECNICO_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_SERVICIO_SUCCESS:
        const newTecnicos = _.filter(state.tecnicos, tecnico => tecnico.id_entidad != action.id_entidad && tecnico.legajo != action.legajo );
        return Object.assign({}, state, { tecnicos: newTecnicos });

  }

  return state;

}

export default tecnicoReducer;
