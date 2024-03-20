import { IUser } from "@/src/types/user";
import { api } from "../apiBase";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUser, void>({
      query: () => ({
        url: "api/users/profile",
      }),
      providesTags: ["UserProfile"],
    }),
    updateProfile: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: "api/users/updateMe",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
