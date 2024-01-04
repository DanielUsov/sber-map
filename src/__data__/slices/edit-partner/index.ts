import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPartner, TPlace } from '../../../@types/partners';

export type TEditPartner = TPartner & {
  step: number;
};

const initialState: TEditPartner = {
  partnerId: '',
  title: '',
  conditions: [],
  additionalInfo: '',
  places: [],
  step: -1,
};

const editPartner = createSlice({
  name: 'editPartner',
  initialState,
  reducers: {
    setPartnerId: (state, action: PayloadAction<string>) => {
      state.partnerId = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setConditions: (state, action: PayloadAction<string[]>) => {
      state.conditions = action.payload;
    },
    setAdditionalInfo: (state, action: PayloadAction<string>) => {
      state.additionalInfo = action.payload;
    },
    setPlaces: (state, action: PayloadAction<TPlace[]>) => {
      state.places = action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    clearEditPartnerState: () => {
      return { ...initialState };
    },
  },
});

export const {
  setPartnerId,
  setTitle,
  setConditions,
  setAdditionalInfo,
  setPlaces,
  setStep,
  clearEditPartnerState,
} = editPartner.actions;
export const editPartnerReducer = editPartner.reducer;
