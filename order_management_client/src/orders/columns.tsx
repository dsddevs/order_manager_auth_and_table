import {Column, Order, Product} from "../types.tsx";

export const columns: Column<Order>[] = [
    { id: 'id', label: 'Order ID', minWidth: 100 },
    { id: 'customerName', label: 'Customer Name', minWidth: 170 },
    { id: 'orderDate', label: 'Order Date', minWidth: 170 },
    {
        id: 'totalAmount',
        label: 'Total Amount',
        minWidth: 170,
        align: 'right',
        format: (value: number | string | Product[]) => {
            if (typeof value === 'number') {
                return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            }
            return String(value);
        },
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        format: (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
];