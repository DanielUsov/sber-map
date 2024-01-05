import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newPartnerReducer } from './slices/new-partner';
import { editPartnerReducer } from './slices/edit-partner';
import { partnerApi } from './services/api/partner';

const rootReducer = combineReducers({
  newPartner: newPartnerReducer,
  editPartner: editPartnerReducer,
  [partnerApi.reducerPath]: partnerApi.reducer,
});

const apiMiddleware: any[] = [partnerApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

setupListeners(store.dispatch);
