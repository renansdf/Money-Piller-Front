import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Session from '../pages/Session';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Session} />
      {/* <Route path="/session/:hash" component={Session} /> */}
    </Switch>
  );
}

export default Routes;