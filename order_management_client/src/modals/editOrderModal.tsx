import {
    Modal,
    Box,
    Typography,
    Button,
    TextField,
    CircularProgress,
    FormControl,
    InputLabel,
    Select, MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { EditOrderModalProps, Order } from '../types';

export function EditOrderModal({ order, onSave, onClose, isLoading }: EditOrderModalProps) {
    const { control, handleSubmit } = useForm<Order | Omit<Order, 'id'>>({
        defaultValues: order || {},
    });

    const onSubmit = async (data: Order | Omit<Order, 'id'>) => {
        await onSave(data);
        onClose();
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" component="h2">
                    {order ? 'Edit Order' : 'Add New Order'}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="customerName"
                        control={control}
                        rules={{ required: 'Customer name is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Customer Name"
                                fullWidth
                                margin="normal"
                                error={!!error}
                                helperText={error?.message}
                                disabled={isLoading}
                            />
                        )}
                    />
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Status is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <FormControl fullWidth margin="normal" error={!!error}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    {...field}
                                    label="Status"
                                    disabled={isLoading}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="processing">Processing</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="totalAmount"
                        control={control}
                        rules={{ required: 'Total amount is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                label="Total Amount"
                                type="number"
                                fullWidth
                                margin="normal"
                                error={!!error}
                                helperText={error?.message}
                                disabled={isLoading}
                            />
                        )}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {isLoading && <CircularProgress size={24} sx={{ mr: 2 }} />}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mr: 1 }}
                            disabled={isLoading}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}