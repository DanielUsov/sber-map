import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPartner, TPlace } from '../../../@types/partners';

export type TNewPartner = Pick<
  TPartner,
  Exclude<keyof TPartner, 'partnerId'>
> & {
  step: number;
};

const initialState: TNewPartner = {
  title: '',
  conditions: [],
  additionalInfo: '',
  places: [],
  step: -1,
};

const newPartner = createSlice({
  name: 'newPartner',
  initialState,
  reducers: {
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
    clearNewPartnerState: () => {
      return { ...initialState };
    },
  },
});

export const {
  setTitle,
  setConditions,
  setAdditionalInfo,
  setPlaces,
  setStep,
  clearNewPartnerState,
} = newPartner.actions;
export const newPartnerReducer = newPartner.reducer;
