import * as types from '../actions/action-types';

export function hideMsgAlert() {
  return {
    type: types.HIDE_MSG
  };
}

export function showMsgAlert(msg,typeMsg,timeout) {
  return {
    type: types.SHOW_MSG,
	msg,
    typeMsg,
    timeout
  };
}
