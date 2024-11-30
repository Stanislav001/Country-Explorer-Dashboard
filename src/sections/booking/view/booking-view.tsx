/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable perfectionist/sort-imports */
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';

import { Scrollbar } from 'src/components/scrollbar';

import { BookingTableRow } from '../booking-table-row';
import { BookingTableHead } from '../booking-table-head';

import { emptyRows } from 'src/sections/user/utils';
import { TableEmptyRows } from 'src/sections/user/table-empty-rows';

import { useGetBookings } from 'src/hooks/useGetBookings';
import { useAuth } from 'src/context/auth-context';

export function BookingView() {
  const table = useTable();

  const { currentToken } = useAuth();
  const { data: bookings, isFetched: bookingsIsFetched } = useGetBookings(currentToken);
  
  if (!bookingsIsFetched) {
    return null;
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Bookings
        </Typography>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BookingTableHead
                headLabel={[
                  { id: 'hotel', label: 'Hotel' },
                  { id: 'user', label: 'User' },
                  { id: 'price', label: 'Price' },
                  { id: 'createdAt', label: 'Created At' },
                  { id: '', label: 'Options', align: 'center' },
                ]}
              />
              <TableBody>
                {bookings?.slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                ).map((booking: any) => (
                  <BookingTableRow
                    key={booking._id}
                    row={booking}
                  />
                ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, bookings?.length)}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={bookings?.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

export function useTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    rowsPerPage,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}
