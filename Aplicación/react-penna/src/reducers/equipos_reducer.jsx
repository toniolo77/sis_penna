import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 equipos: []
};

const equipoReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_EQUIPOS_SUCCESS:
      return Object.assign({}, state, { equipos: action.equipos });

    case types.ADD_EQUIPO_SUCCESS:
        return Object.assign({}, state);

    case types.UPDATE_EQUIPO_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_EQUIPO_SUCCESS:
      const newEquipos = _.filter(state.equipos, equipo => equipo.id_bien != action.id_bien);
      return Object.assign({}, state, { equipos: newEquipos });
  }

  return state;

}

export default equipoReducer;
