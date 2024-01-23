import { createApi } from '@reduxjs/toolkit/query/react';
import { TSuccess } from '../../../../@types/api';
import { TPartner } from '../../../../@types/partners';
import { baseQuery } from '../../../../utils/api';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery,
  endpoints: (builder) => ({
    getPartners: builder.query<TPartner[], void>({
      query: () => '/api/v1/partners',
    }),
    createPartner: builder.mutation<
      TSuccess,
      Pick<TPartner, Exclude<keyof TPartner, 'partnerId'>>
    >({
      query: (partnerData) => ({
        url: '/api/v1/partners',
        method: 'POST',
        body: partnerData,
      }),
    }),
    getPartnerById: builder.query<TPartner, string>({
      query: (partnerId) => `/api/v1/partners/${partnerId}`,
    }),
    updatePartner: builder.mutation<TSuccess, any>({
      query: (partnerData) => ({
        url: `/api/v1/partners`,
        method: 'PUT',
        body: partnerData,
      }),
    }),
    deletePartner: builder.mutation<TSuccess, string>({
      query: (partnerID) => ({
        url: `/api/v1/partners/${partnerID}`,
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
