import React, { useState, useMemo } from 'react';
import { Table,  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    TablePagination, TableSortLabel, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {OrderSort, UniversalTableProps} from "../types";
import {getComparator, stableSort} from "../orders/orderSort.tsx";

export function UniversalTable<T>({
                                      columns,
                                      data,
                                      onEdit,
                                      onDelete,
                                      expandableContent,
                                      isLoading
                                  }: UniversalTableProps<T>){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expandedRow, setExpandedRow] = useState<T | null>(null);
    const [order, setOrder] = useState<OrderSort>('asc');
    const [orderBy, setOrderBy] = useState<keyof T>(columns[0].id as keyof T);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property: keyof T) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedData = useMemo(
        () => stableSort(data, getComparator(order, orderBy)),
        [data, order, orderBy]
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ height: '400px', overflow: 'auto' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id as string}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id as keyof T)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <React.Fragment key={index}>
                                    <TableRow onClick={() => setExpandedRow(expandedRow === row ? null : row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id as keyof T];
                                            return (
                                                <TableCell key={column.id as string} align={column.align}>
                                                    {column.format ? column.format(value) : value as React.ReactNode}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <IconButton onClick={(e) => { e.stopPropagation(); onEdit(row); }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={(e) => { e.stopPropagation(); onDelete(row); }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRow === row && expandableContent && (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 1}>{expandableContent(row)}</TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}