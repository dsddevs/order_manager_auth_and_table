import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {RootState} from "../store.tsx";

interface PrivateRouteProps {
    children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};