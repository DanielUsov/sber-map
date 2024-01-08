import { createApi } from '@reduxjs/toolkit/query/react';
import { Success } from '../../../../@types/api';
import { TPartner } from '../../../../@types/partners';
import { baseQuery } from '../../../../utils/api';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery,
  endpoints: (builder) => ({
    getPartners: builder.query<TPartner[], void>({
      query: () => '/api/v1/partners',
    }),
    createPartner: builder.mutation<Success, TPartner>({
      query: (partnerData) => ({
        url: '/partner',
        method: 'POST',
        body: partnerData,
      }),
    }),
    getPartnerById: builder.query<TPartner, string>({
      query: (partnerId) => `/api/v1/partners/${partnerId}`,
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
  useGetPartnersQuery,
  useCreatePartnerMutation,
  useGetPartnerByIdQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = partnerApi;
