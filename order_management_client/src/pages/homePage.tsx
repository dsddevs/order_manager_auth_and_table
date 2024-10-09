import {OrdersManagement} from "../orders/orderManagement.tsx";
import {Box} from "@mui/material";

export const HomePage = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#fafafa',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <OrdersManagement/>
        </Box>
    )
}