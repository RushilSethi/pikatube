import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1000/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("AuthToken");

      headers.set("Content-Type", "application/json");

      const endpointsRequiringAuth = ["updateUserDetails", "createChannel", "updateChannelInfo"];
      if (token && endpointsRequiringAuth.includes(endpoint)) {
        headers.set("Authorization", `JWT ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Channel"],
  endpoints: (builder) => ({
    fetchVideos: builder.query({
      query: () => "/video",
    }),
    fetchVideoById: builder.query({
      query: (id) => `/video/${id}`,
    }),
    fetchChannelById: builder.query({
      query: (id) => `/channel/${id}`,
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
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
    fetchUserDetailsById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }, {type: "Channel", id}],
    }),
    updateUserDetails: builder.mutation({
      query: ({ id, body }) => ({
        url: `user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ({ id }) => [{ type: 'User', id }],
    }),
    createChannel: builder.mutation({
      query: (body) => ({
        url: `channel`,
        method: "POST",
        body
      }),
      invalidatesTags: ({ id }) => [{ type: 'Channel', id }],
    }),
    updateChannelInfo: builder.mutation({
      query: ({id, body}) => ({
        url: `channel/${id}`,
        method: "PUT",
        body
      })
    })
  }),
});

export const {
  useFetchVideosQuery,
  useFetchVideoByIdQuery,
  useFetchChannelByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useValidateTokenMutation,
  useFetchUserDetailsByIdQuery,
  useUpdateUserDetailsMutation,
  useCreateChannelMutation,
  useUpdateChannelInfoMutation,
  
} = apiSlice;
