import {AlertColor} from "@mui/material";

export interface User {
    username: string;
    token: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    status: string;
}

export interface OrderFiltersProps {
    onFilter: (filters: FilterState) => void;
    onReset: () => void;
}

export interface FilterState {
    status: string;
    dateRange: { start: Date | null; end: Date | null } | null;
    searchQuery: string;
}

export interface Filters {
    status?: string;
    dateRange?: {
        start: Date | null;
        end: Date | null;
    } | null;
    searchQuery?: string;
}

export interface CustomNotificationProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
}

export interface EditOrderModalProps {
    order: Order | null;
    onSave: (order: Order | Omit<Order, 'id'>) => Promise<void>;
    onClose: () => void;
    isLoading: boolean;
}

export interface Column<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
}

export interface UniversalTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    expandableContent?: (item: T) => React.ReactNode;
    isLoading: boolean;
}

export interface AddOrderModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<Order, 'id'>) => void;
}

export interface DeleteOrderModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    orderName: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface IFormInput {
    username: string;
    password: string;
}

export type OrderSort = 'asc' | 'desc';