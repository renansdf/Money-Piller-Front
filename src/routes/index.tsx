import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateSession from '../pages/CreateSession';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={CreateSession} />
      {/* <Route path="/session/:hash" component={Session} /> */}
    </Switch>
  );
}

export default Routes;