import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { newPartnerReducer } from './slices/new-partner';
import { editPartnerReducer } from './slices/edit-partner';

export const newPartnerPersistConfig = {
  key: 'newPartner',
  storage,
};

export const editPartnerPersistConfig = {
  key: 'editPartner',
  storage,
};

export const persistedNewPartnerReducer = persistReducer(
  newPartnerPersistConfig,
  newPartnerReducer
);

export const persistedEditPartnerReducer = persistReducer(
  editPartnerPersistConfig,
  editPartnerReducer
);
