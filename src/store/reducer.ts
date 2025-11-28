import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity, loadOffers, loadReviews, setOffersDataLoadingStatus,
  requireAuthorization, setError, setUserData
} from './action';
import { type Offer } from '../types/offer';
import { type ReviewType } from '../types/review';
import { type City } from '../types/city';
import { type UserData } from '../types/user-data';
import { AuthorizationStatus } from '../const';
import { fetchOffersAction, fetchOfferAction, fetchReviewsAction, fetchNearbyAction } from './api-actions';

type InitialState = {
  city: City;
  offers: Offer[];
  offer: Offer | null;
  reviews: ReviewType[];
  nearby: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  error: string | null;
}

const initialState: InitialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  offers: [],
  offer: null,
  reviews: [],
  nearby: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })

    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })

    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    })

    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
    })

    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })

    .addCase(fetchNearbyAction.fulfilled, (state, action) => {
      state.nearby = action.payload;
    })

    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
