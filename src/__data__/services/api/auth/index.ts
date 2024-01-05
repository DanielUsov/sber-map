import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../../utils/api';
import { useAuth } from '../../../../hooks/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
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
      transformResponse: (response: any): any => {
        const { initSetup } = useAuth();
        initSetup(response.newAccessToken);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
