import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  redirectTo: AppRoute;
  children: ReactNode;
};

function PrivateRoute({authorizationStatus, redirectTo, children}: PrivateRouteProps): JSX.Element {
  const hasAccess = authorizationStatus === AuthorizationStatus.Auth;

  return hasAccess
    ? children as JSX.Element
    : <Navigate to={redirectTo}/>;
}

export default PrivateRoute;
