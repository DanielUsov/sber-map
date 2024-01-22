import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAuth } from '../../../../hooks/auth';
import { TAuthResponse } from '../../../../@types/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://185.196.117.66:8080' }),
  endpoints: (builder) => ({
    login: builder.mutation<TAuthResponse, any>({
      query: (loginData) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: {
          email: loginData.email,
          password: loginData.password,
        },
      }),
      transformResponse: (response: TAuthResponse): TAuthResponse => {
        const { initSetup } = useAuth();
        initSetup(response.accessToken);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
