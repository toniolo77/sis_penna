import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 solicitudes: []
};

const solicitudReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_SOLICITUDES_SUCCESS:
      return Object.assign({}, state, { solicitudes: action.solicitudes });

    case types.ADD_SOLICITUD_SUCCESS:
        var nuevo_solicitudes=[];
        state.solicitudes.map((solicitud) =>
            nuevo_solicitudes.push(solicitud)
        );
        nuevo_solicitudes.push(action.solicitud[0]);
        return Object.assign({}, {solicitudes:nuevo_solicitudes});

    case types.UPDATE_SOLICITUD_SUCCESS:
        return Object.assign({}, state);

    case types.DELETE_SOLICITUD_SUCCESS:
      const newSolicitudes = _.filter(state.solicitudes, solicitud => solicitud.id_solicitud != action.id_solicitud);
      return Object.assign({}, state, { solicitudes: newSolicitudes });
  }

  return state;

}

export default solicitudReducer;
