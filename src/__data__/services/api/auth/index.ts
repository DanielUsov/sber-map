import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAuth } from '../../../../hooks/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (loginData) => ({
        url: '/api/v1/auth/login',
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
