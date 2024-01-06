import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { newPartnerReducer } from './slices/new-partner';

export const newPartnerPersistConfig = {
  key: 'newPartner',
  storage,
};

export const persistedNewPartnerReducer = persistReducer(
  newPartnerPersistConfig,
  newPartnerReducer
);
