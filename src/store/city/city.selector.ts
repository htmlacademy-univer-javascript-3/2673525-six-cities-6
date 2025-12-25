import { NameSpace } from '../../const';
import { type State } from '../../types/state';

export const getCity = (state: State) => state[NameSpace.City].city;
