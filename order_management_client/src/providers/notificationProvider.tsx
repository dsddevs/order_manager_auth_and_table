import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AlertColor } from '@mui/material';

interface NotificationState {
    open: boolean;
    message: string;
    severity: AlertColor;
}

interface NotificationContextType {
    notification: NotificationState;
    setNotification: React.Dispatch<React.SetStateAction<NotificationState>>;
    handleCloseNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification must be used within a NotificationProvider');
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {

    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleCloseNotification = () => {
        setNotification({...notification, open: false});
    };

    return (
        <NotificationContext.Provider value={{ notification, setNotification, handleCloseNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};