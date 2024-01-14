import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';
import {
  persistedEditPartnerReducer,
  persistedNewPartnerReducer,
} from './persistStore';
import { partnerApi } from './services/api/partner';

const rootReducer = combineReducers({
  newPartner: persistedNewPartnerReducer,
  editPartner: persistedEditPartnerReducer,
  [partnerApi.reducerPath]: partnerApi.reducer,
});

const apiMiddleware: any[] = [partnerApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
