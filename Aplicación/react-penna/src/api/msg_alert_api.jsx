
import store from '../store';
import {hideMsgAlert,showMsgAlert} from '../actions/msg_alert_actions';

export function hideMsg() {
    store.dispatch(hideMsgAlert());
}

export function showMsg(msg,typeMsg='error',timeout=2000) {
    store.dispatch(showMsgAlert(msg,typeMsg,timeout));
}
