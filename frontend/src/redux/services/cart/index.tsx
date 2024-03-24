import { ICart } from "@/src/types/cart";
import { api } from "../apiBase";
import { IProduct, IProductWithAmount } from "@/src/types/product";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsersCart: builder.query<ICart, void>({
      query: (body) => ({
        url: "api/carts",
        method: "GET",
        body,
      }),
      providesTags: ["Cart"],
    }),
    updateUsersCart: builder.mutation<ICart, { cartObj: string }>({
      query: (body) => ({
        url: "api/carts",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    createUsersCart: builder.mutation<ICart, { cartObj: string }>({
      query: (body) => ({
        url: "api/carts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    getFullCart: builder.mutation<IProductWithAmount[], { cartObj: string }>({
      query: (body) => ({
        url: "api/carts/full",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useUpdateUsersCartMutation,
  useGetUsersCartQuery,
  useLazyGetUsersCartQuery,
  useCreateUsersCartMutation,
  useGetFullCartMutation,
} = authApi;
