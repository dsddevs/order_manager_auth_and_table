import { Modal, Box, Typography, Button } from '@mui/material';
import {DeleteOrderModalProps} from "../types.tsx";

export function DeleteOrderModal({ open, onClose, onConfirm, orderName }: DeleteOrderModalProps) {
    return (
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
                <Typography variant="h6" component="h2" gutterBottom>
                    Confirm Deletion
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to delete the order for {orderName}?
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}