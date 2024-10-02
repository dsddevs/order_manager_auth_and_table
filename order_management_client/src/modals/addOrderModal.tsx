import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import {AddOrderModalProps, Order} from "../types.tsx";
import {CustomNotification} from "../notifications.tsx";
import {format} from "date-fns";
import {useNotification} from "../providers/notificationProvider.tsx";

export function AddOrderModal({open, onClose, onSubmit}: AddOrderModalProps) {
    const { control, handleSubmit, reset } = useForm<Omit<Order, 'id'>>({
        defaultValues: {
            customerName: '',
            totalAmount: 0.0,
            status: '',
            orderDate: format(new Date(), 'yyyy-MM-dd')
        }
    });

    const { notification, setNotification, handleCloseNotification} = useNotification();

    const onSubmitForm = (data: Omit<Order, 'id'>) => {
        if (!data.customerName || !data.totalAmount || !data.status || !data.orderDate) {
            setNotification({
                open: true,
                message: 'Please fill in all required fields',
                severity: 'error'
            });
            return;
        }
        onSubmit(data);
        setNotification({
            open: true,
            message: 'Order added successfully!',
            severity: 'success'
        });
        reset();
        onClose();
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Typography variant="h6" component="h2">
                        Add New Order
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Controller
                            name="customerName"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Customer name is required'}}
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    {...field}
                                    label="Customer Name"
                                    fullWidth
                                    margin="normal"
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="totalAmount"
                            control={control}
                            rules={{
                                required: 'Total amount is required',
                                pattern: {value: /^\d+(\.\d{1,2})?$/, message: 'Invalid amount'}
                            }}
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Total Amount"
                                    fullWidth
                                    margin="normal"
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}/>
                        <Controller
                            name="status"
                            control={control}
                            defaultValue=""
                            rules={{required: 'Status is required'}}
                            render={({field, fieldState: {error}}) => (
                                <FormControl fullWidth margin="normal" error={!!error}>
                                    <InputLabel>Status</InputLabel>
                                    <Select {...field} label="Status">
                                        <MenuItem value="pending">Pending</MenuItem>
                                        <MenuItem value="processing">Processing</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="orderDate"
                            control={control}
                            defaultValue={new Date().toISOString().split('T')[0]}
                            rules={{required: 'Order date is required'}}
                            render={({field, fieldState: {error}}) => (
                                <TextField
                                    {...field}
                                    type="date"
                                    label="Order Date"
                                    fullWidth
                                    margin="normal"
                                    error={!!error}
                                    helperText={error?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                        <Box sx={{mt: 2}}>
                            <Button type="submit" variant="contained" sx={{mr: 1}}>
                                Add Order
                            </Button>
                            <Button onClick={onClose} variant="outlined">
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
            <CustomNotification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={handleCloseNotification}
            />
        </>
    );
}