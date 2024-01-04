import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newPartnerReducer } from './slices/new-partner';
import { editPartnerReducer } from './slices/edit-partner';

const rootReducer = combineReducers({
  newPartner: newPartnerReducer,
  editPartner: editPartnerReducer,
});

const apiMiddleware: any[] = [];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

setupListeners(store.dispatch);
