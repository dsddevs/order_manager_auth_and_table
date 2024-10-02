import React from 'react';
import { Snackbar, Alert} from '@mui/material';
import {CustomNotificationProps} from "./types.tsx";

export const CustomNotification: React.FC<CustomNotificationProps> = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};