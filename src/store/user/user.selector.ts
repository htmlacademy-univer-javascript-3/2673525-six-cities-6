import { NameSpace } from '../../const';
import { type State } from '../../types/state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State) => state[NameSpace.User].user;
export const getUserError = (state: State) => state[NameSpace.User].error;
