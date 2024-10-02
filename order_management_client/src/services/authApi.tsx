import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {LoginRequest, LoginResponse} from "../types.tsx";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;

