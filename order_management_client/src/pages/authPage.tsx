import {AuthForm} from "../auth/authForm.tsx";
import {Box} from "@mui/material";

export const AuthPage = () => {
    return (
        <Box id={`box-id`} className={`relative flex justify-center items-center w-full h-screen`}
             sx={{
                 backgroundColor: '#081529',
                 color: 'white',
             }}
        >
            <AuthForm/>
        </Box>
    )
}