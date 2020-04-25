import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 prestaciones: []
};

const prestacionReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_PRESTACIONES_SUCCESS:
      return Object.assign({}, state, { prestaciones: action.prestaciones });

    case types.ADD_PRESTACION_SUCCESS:
        return Object.assign({}, state);

    case types.UPDATE_PRESTACION_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_PRESTACION_SUCCESS:
      const newPrestaciones = _.filter(state.prestaciones, prestacion => prestacion.id_bien != action.id_bien);
      return Object.assign({}, state, { prestaciones: newPrestaciones });
  }

  return state;

}

export default prestacionReducer;
