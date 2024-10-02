import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../types';

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_PORT}),
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => 'orders',
        }),
        getOrder: builder.query<Order, string>({
            query: (id) => `orders/${id}`,
        }),
        createOrder: builder.mutation<Order, Omit<Order, 'id'>>({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder,
            }),
        }),
        updateOrder: builder.mutation<Order, Partial<Order>>({
            query: ({ id, ...patch }) => ({
                url: `orders/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        deleteOrder: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = orderApi;
