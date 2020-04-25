import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
 form_equipos: []
};

const formsReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_EQUIPOS_SUCCESS:
      return Object.assign({}, state, { equipos: action.equipos });
  }

  return state;

}

export default formsReducer;
