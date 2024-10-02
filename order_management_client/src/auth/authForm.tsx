import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Button, Box, Typography, Container, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useLoginMutation} from "../services/authApi.tsx";
import {setCredentials} from "../slices/authSlice.tsx";
import {CustomNotification} from "../notifications.tsx";
import {AppDispatch} from "../store.tsx";
import {IFormInput} from "../types.tsx";
import {useNotification} from "../providers/notificationProvider.tsx";

export const AuthForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [, {isLoading}] = useLoginMutation();
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();
    const color = "#44444a";
    const {notification, setNotification, handleCloseNotification} = useNotification();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if (data.username === 'admin' && data.password === 'admin') {
            try {
                const result = {username: data.username, token: 'fake-jwt-token'};
                dispatch(setCredentials(result));
                navigate("/home");
            } catch (error) {
                console.error("Failed to set credentials or navigate:", error);
                setNotification({open: true, message: 'An error occurred while logging in', severity: 'error'});
            }
        } else {
            setNotification({open: true, message: 'Invalid username or password', severity: 'error'});
        }
    };

    return (
        <Container maxWidth="xs" className="mt-8 bg-slate-300 p-12 rounded-lg">
            <Box className="flex flex-col items-center">
                <Typography component="h1" variant="h5" className="mb-4 text-slate-700">
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={`w-full ${color} font-bold`}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        {...register("username", {required: "Username is required"})}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        sx={{
                            '& label': {color: `${color}`},
                            '& label.Mui-focused': {color: `${color}`},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {borderColor: `${color}`},
                                '&:hover fieldset': {borderColor: `${color}`},
                                '&.Mui-focused fieldset': {borderColor: `${color}`},
                            },
                            '& .MuiInputBase-input': {color: `${color}`},
                        }}
                    />
                    <TextField variant="outlined"
                               margin="normal"
                               fullWidth
                               id="password"
                               label="Password"
                               type="password"
                               autoComplete="current-password"
                               {...register("password", {required: "Password is required"})}
                               error={!!errors.password}
                               helperText={errors.password?.message}
                               sx={{
                                   '& label': {color: `${color}`},
                                   '& label.Mui-focused': {color: `${color}`},
                                   '& .MuiOutlinedInput-root': {
                                       '& fieldset': {borderColor: `${color}`},
                                       '&:hover fieldset': {borderColor: `${color}`},
                                       '&.Mui-focused fieldset': {borderColor: `${color}`},
                                   },
                                   '& .MuiInputBase-input': {color: `${color}`},
                                   '& .MuiInputAdornment-root .MuiIconButton-root': {color: `${color}`},
                               }}
                    />
                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            className="mt-3 mb-2"
                            disabled={isLoading}
                            sx={{
                                backgroundColor: '#334155',
                                color: 'white',
                                '&:hover': {backgroundColor: '#344d75',},
                                '&:disabled': {backgroundColor: '#cccccc',},
                            }}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Box>
            <CustomNotification open={notification.open}
                                message={notification.message}
                                severity={notification.severity}
                                onClose={handleCloseNotification}
            />
        </Container>
    );
};