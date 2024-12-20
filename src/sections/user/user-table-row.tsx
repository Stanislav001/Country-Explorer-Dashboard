/* eslint-disable perfectionist/sort-imports */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import { Iconify } from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import userService from 'src/services/user';
import { useRouter } from 'src/routes/hooks';
import { useAuth } from 'src/context/auth-context';

export type UserProps = {
  _id: string;
  username: string;
  role: string;
  status: string;
  email: string;
  profile: string;
};

type UserTableRowProps = {
  row: UserProps;
  refetchUsers : () => void;
};

export function UserTableRow({ row, refetchUsers }: UserTableRowProps) {
  const router  = useRouter();
  const { currentToken } = useAuth();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const updateUserHandler = useCallback(() => {
    router.push(`/update-user/${row._id}`);
    handleClosePopover();
  }, [row._id, router, handleClosePopover]);

  const deleteUserHandler = useCallback(async () => {
    try {
      const result = await userService.deleteUser(row?._id, currentToken);

      if (result.status) {
        await refetchUsers();
        handleClosePopover();
      }
    } catch (error) {
      handleClosePopover();
    }
  }, [row, currentToken, refetchUsers, handleClosePopover]);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.username} src={row.profile} />
            {row.username}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell>{row.role}</TableCell>

        <TableCell align="center">
          {true ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell align="right">
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
          <MenuItem onClick={() => updateUserHandler()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => deleteUserHandler()} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
