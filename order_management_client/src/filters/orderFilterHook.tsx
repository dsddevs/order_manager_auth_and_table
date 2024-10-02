import { useMemo } from 'react';
import { Order, Filters } from '../types';

export const useOrderFilterHook = (orders: Order[] | undefined, filters: Filters) => {
    return useMemo(() => {
        if (!orders) return [];
        return orders.filter(order => {
            if (filters.status && filters.status !== '' && order.status.toUpperCase() !== filters.status.toUpperCase()) {
                return false;
            }
            if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
                const orderDate = new Date(order.orderDate);
                const startDate = new Date(filters.dateRange.start);
                const endDate = new Date(filters.dateRange.end);

                orderDate.setHours(0, 0, 0, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);

                if (orderDate < startDate || orderDate > endDate) {
                    return false;
                }
            }
            if (filters.searchQuery && filters.searchQuery.trim() !== '') {
                const searchLower = filters.searchQuery.toLowerCase().trim();
                return order.id.toLowerCase().includes(searchLower) ||
                    order.customerName.toLowerCase().includes(searchLower);
            }
            return true;
        });
    }, [orders, filters]);
}