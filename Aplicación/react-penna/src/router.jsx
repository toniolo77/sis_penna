import React from 'react';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Container from './componentes/Container';
import Layout from './componentes/genericos/Layout';
import Menu from './componentes/menu/Menu';
import Inicio from './componentes/Inicio';
import AuthorizedRoute from './componentes/AuthorizedRoute';
import MessageAlert from './componentes/commons/MessageAlert';
import RutasHabilitadas from './RutasHabilitadas';
import { ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

export default (

   <ConnectedRouter history={history}>
        <div>
            <Route exact  path="/auth"  component={Inicio} />
            <AuthorizedRoute>
               <Layout>
                   <MessageAlert/>
                   <Menu/>
                   <Container>
                        <RutasHabilitadas />
                    </Container>
                </Layout>
            </AuthorizedRoute>
        </div>
   </ConnectedRouter>

  );
