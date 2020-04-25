import React from 'react';
import ReactDOM from 'react-dom';
import Bs from 'react-bootstrap/lib';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Provider store={store}>{router}</Provider>,
    document.getElementById('container')
  );
});
