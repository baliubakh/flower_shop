import { IUserBody, IUserResponse } from "@/src/types/user";

import { api } from "../apiBase";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<IUserResponse, IUserBody>({
      query: (body) => ({
        url: "api/users/signin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    signup: builder.mutation<IUserResponse, IUserBody>({
      query: (body) => ({
        url: "api/users/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "api/users/refresh",
      }),
      providesTags: ["Refresh"],
    }),
    signout: builder.query<{ message: string }, void>({
      query: () => ({
        url: "api/users/signout",
      }),
      providesTags: ["SignOut"],
    }),
  }),
});

export const {
  useRefreshTokenQuery,
  useSigninMutation,
  useSignupMutation,
  useLazySignoutQuery,
} = authApi;
