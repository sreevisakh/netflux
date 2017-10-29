import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'
import './app.scss';
import Navbar from 'components/Navbar'
import Body from 'components/Body'
import { HashRouter } from 'react-router-dom';

const App = () => (
  <HashRouter>
    <Provider store={store}>
      <div>
        <Navbar />
        <Body />
      </div>
    </Provider>
  </HashRouter>
);

ReactDom.render(<App />, document.getElementById('app'));
