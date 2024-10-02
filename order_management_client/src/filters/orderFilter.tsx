import { useState } from 'react';
import {Box, TextField, Select, MenuItem, Button, SelectChangeEvent, AlertColor} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderFiltersProps } from "../types.tsx";
import {CustomNotification} from "../notifications.tsx";

export function OrderFilters({ onFilter, onReset }: OrderFiltersProps) {
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info' as AlertColor
    });

    const handleApplyFilters = () => {
        const newFilters = {
            status,
            dateRange: startDate && endDate ? { start: startDate, end: endDate } : null,
            searchQuery
        };
        console.log('Applying filters:', newFilters);
        onFilter(newFilters);
        setNotification({
            open: true,
            message: 'Filters applied successfully',
            severity: 'success'
        });
    };

    const handleResetFilters = () => {
        setStatus('');
        setStartDate(null);
        setEndDate(null);
        setSearchQuery('');
        onFilter({status: '', dateRange: null, searchQuery: ''});
        onReset();
        setNotification({
            open: true,
            message: 'Filters reset',
            severity: 'info'
        });
    };

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        const newStatus = event.target.value;
        console.log('New status selected:', newStatus);
        setStatus(newStatus);
        onFilter({
            status: newStatus,
            dateRange: startDate && endDate ? { start: startDate, end: endDate } : null,
            searchQuery
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box>
                <TextField
                    label="Search by Customer Name or Order ID"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleApplyFilters();
                    }}
                    fullWidth
                    margin="normal"
                />
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    fullWidth
                    displayEmpty
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="PROCESSING">Processing</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                </Select>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(date: Date | null) => {
                            setStartDate(date);
                            handleApplyFilters();
                        }}
                        slotProps={{ textField: { style: { width: '48%' } } }}
                    />
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(date: Date | null) => {
                            setEndDate(date);
                            handleApplyFilters();
                        }}
                        slotProps={{ textField: { style: { width: '48%' } } }}
                    />
                </Box>
                <Box mt={2}>
                    <Button variant="contained" onClick={handleApplyFilters} style={{ marginRight: '8px' }}>
                        Apply Filters
                    </Button>
                    <Button variant="outlined" onClick={handleResetFilters}>
                        Reset Filters
                    </Button>
                </Box>
            </Box>
            <CustomNotification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={handleCloseNotification}
            />
        </LocalizationProvider>
    );
}


