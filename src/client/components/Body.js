import React from 'react';
import Serials from 'components/Serials'
import Serial from 'components/Serial'
import AddSerial from 'components/AddSerial'

import { Route, Redirect, Switch } from 'react-router-dom';
export default class Body extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        <Route path="/add" component={AddSerial} />
        <Route path="/list" component={Serials} />
        <Route path="/view" component={Serial} />
        <Redirect from="/" to="/list" />
      </Switch>
    );
  }
}
