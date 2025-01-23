import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1000/',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem('jwtToken');

      const endpointsRequiringAuth = ['getSecureData', 'updateProfile', 'postData'];

      if (token && endpointsRequiringAuth.includes(endpoint)) {
        headers.set('Authorization', `JWT ${token}`);
      }

      return headers;

    },
  }),
  endpoints: (builder) => ({
    fetchVideos: builder.query({
      query: () => '/video',
    }),
    fetchVideoById: builder.query({
      query: (id) => `/video/${id}`,
    }),
    fetchChannelById: builder.query({
      query: (id) => `/channel/${id}`,
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
    }),
    validateToken: builder.mutation({
      query: (token) => ({
        url: "/validate-token",
        method: "POST",
        body: { token },
      }),
    }),
  }),
});

export const { useFetchVideosQuery, useFetchVideoByIdQuery, useFetchChannelByIdQuery, useRegisterUserMutation, useValidateTokenMutation } = apiSlice;
