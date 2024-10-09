import React, {useState} from 'react';
import {Box, Typography, CircularProgress, Button} from "@mui/material";
import { useGetOrdersQuery, useUpdateOrderMutation, useCreateOrderMutation, useDeleteOrderMutation } from "../services/orderApi";
import { Filters, Order } from "../types";
import { OrderFilters } from "../filters/orderFilter";
import { UniversalTable } from "../table/universalTable";
import { EditOrderModal } from "../modals/editOrderModal";
import {AddOrderModal} from "../modals/addOrderModal.tsx";
import {CustomNotification} from "../notifications.tsx";
import {DeleteOrderModal} from "../modals/deletionOrderModal.tsx";
import {columns} from './columns.tsx';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {AppDispatch} from "../store.tsx";
import {useOrderFilterHook} from "../filters/orderFilterHook.tsx";
import {useNotification} from "../providers/notificationProvider.tsx";

export const OrdersManagement: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
    const [createOrder] = useCreateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filters, setFilters] = useState<Filters>({});
    const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
    const { notification, setNotification, handleCloseNotification} = useNotification();

    const filteredOrders = useOrderFilterHook(orders, filters);
    const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);

    const handleAddOrder = async (newOrder: Omit<Order, 'id'>) => {
        try {
            await createOrder(newOrder).unwrap();
            refetch();
            setIsAddModalOpen(false);
            setNotification({ open: true, message: 'Order added successfully', severity: 'success' });
        } catch (error) {
            setNotification({ open: true, message: getErrorMessage(error), severity: 'error' });
        }
    };

    const handleSaveOrder = async (updatedOrder: Order | Omit<Order, "id">) => {
        try {
            if ('id' in updatedOrder) {
                await updateOrder(updatedOrder as Order).unwrap();
                setNotification({ open: true, message: 'Order updated successfully', severity: 'success' });
            } else {
                await createOrder(updatedOrder).unwrap();
                setNotification({ open: true, message: 'New order created successfully', severity: 'success' });
            }
            refetch();
            setEditingOrder(null);
        } catch (error) {
            setNotification({ open: true, message: getErrorMessage(error), severity: 'error' });
        }
    };

    const handleConfirmDelete = async () => {
        if (deletingOrder) {
            try {
                await deleteOrder(deletingOrder.id).unwrap();
                refetch();
                setNotification({ open: true, message: 'Order deleted successfully', severity: 'success' });
            } catch (error) {
                setNotification({ open: true, message: getErrorMessage(error), severity: 'error' });
            } finally {
                setDeletingOrder(null);
            }
        }
    };

    const handleApplyFilters = (newFilters: Filters) => {
        console.log('Applying new filters:', newFilters);
        setFilters(newFilters);
    };

    const handleResetFilters = () => {
        setFilters({});
    };

    const getErrorMessage = (error: unknown): string => {
        if (typeof error === 'string') return error;
        if (error instanceof Error) return error.message;
        return 'An unknown error occurred';
    };

    if (isLoading) return <CircularProgress />;
    if (error) {
        const errorMessage = getErrorMessage(error);
        return <Typography color="error">Error: {errorMessage}</Typography>;
    }

    return (
        <Box display="flex" justifyContent="space-center" alignItems="center" mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button onClick={handleLogout} variant="contained" color="secondary">
                    Logout
                </Button>
                <Typography variant="h4" className={`text-slate-900`}>Orders Management</Typography>
                <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
                    Add New Order
                </Button>

            </Box>
            <OrderFilters onFilter={handleApplyFilters} onReset={handleResetFilters} />
            <UniversalTable<Order>
                columns={columns}
                data={filteredOrders as Order[]}
                onEdit={setEditingOrder}
                onDelete={setDeletingOrder}
                isLoading={isUpdating}
            />
            {editingOrder && (
                <EditOrderModal
                    order={editingOrder}
                    onSave={handleSaveOrder}
                    onClose={() => setEditingOrder(null)}
                    isLoading={isUpdating}
                />
            )}
            {isAddModalOpen && (
                <AddOrderModal
                    open={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddOrder}
                />
            )}
            {deletingOrder && (
                <DeleteOrderModal
                    open={!!deletingOrder}
                    onClose={() => setDeletingOrder(null)}
                    onConfirm={handleConfirmDelete}
                    orderName={deletingOrder.customerName}
                />
            )}
            <CustomNotification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={handleCloseNotification}
            />
        </Box>
    );
};