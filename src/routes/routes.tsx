import React from 'react';
import {
  RouteProps as ReactDOMRoutesProps,
  Route as ReactDOMRoute,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import LogIn from '../pages/LogIn';

interface RouteProps extends ReactDOMRoutesProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return !user ? (
          <LogIn />
        ) : (
            <Component />
          );
      }}
    />
  );
};

export default Route;