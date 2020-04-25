import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    display_msg: false,
    msg    : ""
};

const msgAlertReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.SHOW_MSG:
      return Object.assign({}, state, { display_msg: true, msg: action.msg,typeMsg:action.typeMsg, timeout: action.timeout  });

	case types.HIDE_MSG:
      return Object.assign({}, state, { display_msg: false, msg: "" });

  }

  return state;

}

export default msgAlertReducer;
