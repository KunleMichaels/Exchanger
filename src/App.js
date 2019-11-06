import React from 'react';
import { Provider } from 'react-redux';
import {Router, Switch, Route } from 'react-router-dom';
import store from './store';
import history from './history';
import Home from './screens/Home';
import Exchange from './screens/Exchange';

function App() {
  return (
    <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path='/' name='Home' component={Home} />
            <Route path='/exchange' name='Exchange' component={Exchange} />
          </Switch>
        </Router>
    </Provider>
  );
}

export default App;
