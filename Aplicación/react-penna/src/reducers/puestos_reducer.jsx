import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 puestos: [
 		]
};

const puestoReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_PUESTOS_SUCCESS:
      return Object.assign({}, state, { puestos: action.puestos });

    case types.ADD_PUESTO_SUCCESS:
        var nuevo_puestos=[];
        state.puestos.map((puesto) =>
            nuevo_puestos.push(puesto)
        );
        nuevo_puestos.push(action.puesto[0]);
        return Object.assign({}, {puestos:nuevo_puestos});

    case types.UPDATE_PUESTO_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_PUESTO_SUCCESS:
      const newPuestos = _.filter(state.puestos, puesto => puesto.id_puesto != action.id_puesto);
      return Object.assign({}, state, { puestos: newPuestos });
  }

  return state;

}

export default puestoReducer;
