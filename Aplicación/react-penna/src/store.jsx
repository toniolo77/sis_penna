import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux'

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(reducers,applyMiddleware(middleware));
export default store;
