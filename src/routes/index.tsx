import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './routes';

import LogIn from '../pages/LogIn';
import Dashboard from '../pages/Dashboard';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={LogIn} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;