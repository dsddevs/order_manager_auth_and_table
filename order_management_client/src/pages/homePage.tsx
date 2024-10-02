import {OrdersManagement} from "../orders/orderManagement.tsx";
import {Box} from "@mui/material";

export const HomePage = () => {
    return (
        <Box className={`flex justify-center items-center bg-blue-500 w-full h-screen text-slate-300`}
             sx={{
                 backgroundColor: '#fafafa',
                 color: 'white',
             }}
        >
            <OrdersManagement/>
        </Box>
    )
}