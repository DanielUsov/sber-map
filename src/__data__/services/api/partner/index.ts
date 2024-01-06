import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../../utils/api';
import { TPartner, TPartnerWithPlacemarks } from '../../../../@types/partners';
import { Success } from '../../../../@types/api';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery,
  endpoints: (builder) => ({
    getPartnersPlacemarks: builder.query<TPartnerWithPlacemarks[], void>({
      query: () => '/partners/placemarks',
    }),
    getPartners: builder.query<TPartner[], void>({
      query: () => '/partners',
    }),
    createPartner: builder.mutation<Success, TPartner>({
      query: (partnerData) => ({
        url: '/partner',
        method: 'POST',
        body: partnerData,
      }),
    }),
    getPartnerById: builder.query<TPartner, string>({
      query: (partnerId) => `/partner/${partnerId}`,
    }),
    updatePartner: builder.mutation<
      Success,
      { partnerID: string; partnerData: TPartner }
    >({
      query: ({ partnerID, partnerData }) => ({
        url: `/partner/${partnerID}`,
        method: 'PUT',
        body: partnerData,
      }),
    }),
    deletePartner: builder.mutation<Success, string>({
      query: (partnerID) => ({
        url: `/partner/${partnerID}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPartnersPlacemarksQuery,
  useGetPartnersQuery,
  useCreatePartnerMutation,
  useGetPartnerByIdQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
