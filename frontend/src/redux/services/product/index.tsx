import { IUserBody, IUserResponse } from "@/src/types/user";

import { api } from "../apiBase";
import { ICreateProduct, IProduct, IUpdateProduct } from "@/src/types/product";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<IProduct, ICreateProduct>({
      query: (body) => ({
        url: "api/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<IProduct, IUpdateProduct>({
      query: ({ id, body }) => ({
        url: `api/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<IProduct, string>({
      query: (id) => ({
        url: `api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: "api/products/all",
      }),
      providesTags: ["Product"],
    }),
    getActiveProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: "api/products",
      }),
      providesTags: ["Product"],
    }),
    getSpecificProduct: builder.query<IProduct, string>({
      query: (id) => ({
        url: `api/products/${id}`,
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetActiveProductsQuery,
  useGetSpecificProductQuery,
} = productApi;
