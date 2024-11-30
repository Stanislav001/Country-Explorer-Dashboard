/* eslint-disable perfectionist/sort-imports */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Iconify } from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';

import { useAuth } from 'src/context/auth-context';
import bookingService from 'src/services/booking';
import { useGetBookings } from 'src/hooks/useGetBookings';

export type BookingProps = {
  _id: string;
  price: number;
  createdAt: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  hotel: {
    _id: string;
    title: string;
    imageUrl: string;
  };
};

type BookingTableRowProps = {
  row: BookingProps;
};

export function BookingTableRow({ row }: BookingTableRowProps) {
  const { currentToken } = useAuth();
  const { refetch: refetchBookings } = useGetBookings(currentToken);

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const deleteUserHandler = useCallback(async () => {
    try {
      const result = await bookingService.deleteBooking(row?._id, currentToken);

      if (result?.status) {
        await refetchBookings();
        handleClosePopover();
      }
    } catch (error) {
      handleClosePopover();
    }
  }, [row, currentToken, refetchBookings, handleClosePopover]);

  return (
   <>
     <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row">
        <Box gap={2} display="flex" alignItems="center">
          <Avatar alt={row.hotel.title} src={row.hotel.imageUrl} />
          {row.hotel.title ?? 'N/A'}
        </Box>
      </TableCell>

      <TableCell>{row?.user?.username ?? 'N/A'}</TableCell>

      <TableCell>{row?.price?.toFixed(2) ? `${row?.price?.toFixed(2)}$` : 'N/A'}</TableCell>

      <TableCell>{row?.createdAt ? new Date(row?.createdAt).toLocaleDateString() : 'N/A'}</TableCell>

      <TableCell align="center">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
    </TableRow>

    <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => deleteUserHandler()} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
   </>
  );
}
