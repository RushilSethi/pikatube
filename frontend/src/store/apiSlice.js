import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem("AuthToken");

      headers.set("Content-Type", "application/json");

      const endpointsRequiringAuth = ["updateUserDetails", "createChannel", "updateChannelInfo", "addVideoByChannelId", "deleteVideoById", "editVideoById", "deleteChannelById", "deleteUserById", "manageVideoInteraction"];
      if (token && endpointsRequiringAuth.includes(endpoint)) {
        headers.set("Authorization", `JWT ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Channel", "Video"],
  endpoints: (builder) => ({
    fetchVideos: builder.query({
      query: () => "/video",
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    fetchVideoById: builder.query({
      query: (id) => `/video/${id}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    fetchChannelById: builder.query({
      query: (id) => `/channel/${id}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
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
      }),
      invalidatesTags: ({ id }) => [{ type: 'Channel', id }],
    }),
    addVideoByChannelId: builder.mutation({
      query: ({channelId, body}) => ({
        url: `/video/${channelId}`,
        method: "POST",
        body
      }),
      invalidatesTags: ({ id }) => [{ type: 'Video', id }],
    }),
    deleteVideoById: builder.mutation({
      query: ({ id }) => ({
        url: `/video/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ({ id }) => [{ type: 'Channel', id }, { type: 'Video', id }],
    }),
    editVideoById: builder.mutation({
      query: ({id, body}) => ({
        url: `/video/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ({ id }) => [{ type: 'Video', id }, {type: 'Channel', id}],
    }),
    getMultipleVideosByIds: builder.mutation({
      query: (videoIds) => ({
        url: '/video/by-ids',
        method: "POST",
        body: {videoIds}
      }),
      providesTags: (id) => [{ type: 'Video', id }],
    }),
    deleteChannelById: builder.mutation({
      query: ({id}) => ({
        url: `/channel/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ({ id }) => [{type: 'Channel', id}],
    }),
    deleteUserById: builder.mutation({
      query: ({id}) => ({
        url: `/user/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ({ id }) => [{type: 'User', id}],
    }),
    searchVideosAndChannels: builder.query({
      query: (query) => `/search?query=${query}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    manageVideoInteraction: builder.mutation({
      query: ({id, body}) => ({
        url: `/video/interact/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ({ id }) => [{ type: 'Video', id }],
    }),
    increaseViews: builder.mutation({
      query: ({id, body}) => ({
        url: `/video/views/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ({ id }) => [{ type: 'Video', id }],
    }),
    getChannelsByIds: builder.mutation({
      query: (body) => ({
        url: 'channel/by-ids',
        method: "POST",
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
  useAddVideoByChannelIdMutation,
  useDeleteVideoByIdMutation,
  useEditVideoByIdMutation,
  useGetMultipleVideosByIdsMutation,
  useDeleteChannelByIdMutation,
  useDeleteUserByIdMutation,
  useSearchVideosAndChannelsQuery,
  useManageVideoInteractionMutation,
  useIncreaseViewsMutation,
  useGetChannelsByIdsMutation
} = apiSlice;
