import React from 'react';
import Serials from 'components/Serials'
import Serial from 'components/Serial'
import AddSerial from 'components/AddSerial'
import Watch from 'components/Watch'

import { Route, Redirect, Switch } from 'react-router-dom';
export default class Body extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/add" component={AddSerial} />
        <Route path="/list" component={Serials} />
        <Route path="/view/:id" component={Serial} />
        <Route path="/watch/:serial/:season/:episode" component={Watch} />
        <Redirect from="/" to="/list" />
      </Switch>
    );
  }
}
