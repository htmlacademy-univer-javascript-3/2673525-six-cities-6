export const SETTINGS = {
  offersCount: 312
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  NotFound = '/notfound',
  Favorites = '/favorites',
  Offer = '/offer'
}

export const getOfferRoute = (id: string | number): string => `${AppRoute.Offer}/${id}`;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
}

export const TIMEOUT_SHOW_ERROR = 2000;
