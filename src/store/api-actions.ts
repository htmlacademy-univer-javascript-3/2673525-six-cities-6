import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Offer } from '../types/offer';
import { AxiosInstance, isAxiosError } from 'axios';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { type AuthData } from '../types/auth-data';
import { type UserData } from '../types/user-data';
import { requireAuthorization, setError, setOffersDataLoadingStatus, setUserData } from './action';
import { dropToken, saveToken } from '../services/token';
import { type ReviewType } from '../types/review';

export const clearErrorAction = createAsyncThunk(
  'site/clearError',
  (_, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, string, {
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<ReviewType[], string, {
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  }
);

export const fetchNearbyAction = createAsyncThunk<Offer[], string, {
  extra: AxiosInstance;
}>(
  'data/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error: unknown) {
      let message = 'Ошибка авторизации';

      if (isAxiosError(error) && error.response) {
        message = (error.response.data as { message: string }).message || message;
      }
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
