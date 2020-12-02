import React from 'react';
import { Switch } from 'react-router-dom';

import AccountGroup from '../pages/Dashboard/Content/AccountGroup';
import Agencies from '../pages/Dashboard/Content/Agencie';
import BankAccount from '../pages/Dashboard/Content/BankAccount';
import Debts from '../pages/Dashboard/Content/Debts';
import Home from '../pages/Dashboard/Content/Home';
import Reports from '../pages/Dashboard/Content/Reports';
import Simulation from '../pages/Dashboard/Content/Simulation';
import Suppliers from '../pages/Dashboard/Content/Suppliers';
import Users from '../pages/Dashboard/Content/Users';
import Route from './routes';

const DashboardRouter: React.FC = () => {
  return (
    <Switch>
      <Route path="/dashboard/users" component={Users} isPrivate />
      <Route path="/dashboard/debts" component={Debts} isPrivate />
      <Route path="/dashboard/suppliers" component={Suppliers} isPrivate />
      <Route path="/dashboard/agencies" component={Agencies} />
      <Route path="/dashboard/bank-accounts" component={BankAccount} isPrivate />
      <Route path="/dashboard/account-groups" component={AccountGroup} isPrivate />
      <Route path="/dashboard/reports" component={Reports} isPrivate />
      <Route path="/dashboard/simulation" component={Simulation} isPrivate />
      <Route path="/dashboard/home" exact component={Home} isPrivate />
    </Switch>
  );
};

export default DashboardRouter;