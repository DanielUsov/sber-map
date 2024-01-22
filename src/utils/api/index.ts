import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://185.196.117.66:8080',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
