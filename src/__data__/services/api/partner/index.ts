import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../../utils/api';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (loginData) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          email: loginData.email,
          password: loginData.password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = partnerApi;
