import {createAction} from '@reduxjs/toolkit';
import { type Offer } from '../types/offer';
import { type ReviewType } from '../types/review';
import { type City } from '../types/city';
import { AuthorizationStatus } from '../const';
import { type UserData } from '../types/user-data';

export const changeCity = createAction<City>('data/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const loadReviews = createAction<ReviewType[]>('data/loadReviews');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData>('user/setUserData');

export const setError = createAction<string | null>('site/setError');

