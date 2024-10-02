import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authReducer from './slices/authSlice';
import { authApi } from "./services/authApi.tsx";
import { orderApi } from "./services/orderApi.tsx";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(orderApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;