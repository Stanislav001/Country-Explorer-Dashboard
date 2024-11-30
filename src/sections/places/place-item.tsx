/* eslint-disable perfectionist/sort-imports */
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import { Label } from 'src/components/label';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

import placeService from 'src/services/place';
import { useAuth } from 'src/context/auth-context';
import { useGetPlaces } from 'src/routes/hooks/useGetPlaces';

export type PlaceItemProps = {
  _id: string;
  location: string;
  imageUrl: string;
  title: string;
  rating: number;
};

export function PlaceItem({ place }: { place: PlaceItemProps }) {
  const router = useRouter();
  const { currentToken, setErrorMessage, setSuccessMessage } = useAuth();
  
  const { refetch: refetchPlaces } = useGetPlaces(currentToken);
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const updatePlaceHandler = () => {
    router.push(`/update-place/${place._id}`);
    handleClosePopover();
  }

  const deletePlaceHandler = async () => {
    try {
      const result = await placeService.deletePlace(place._id, currentToken);

      if (result.status) {
        await refetchPlaces();
        setSuccessMessage(result?.message || "Place deleted successfully");
        handleClosePopover();
      }
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
      handleClosePopover();
    }
  }

  const renderImg = (
    <Box
      component="img"
      alt={place?.title}
      src={place?.imageUrl ? place.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E-EVCmmhLN51ydEr1uFEgcur-yGtBNOaT83DaRj4-O_eAYWW8gaGsLad35PJTVPD8l0&usqp=CAU'}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
        variant="inverted"
        color={(place.rating && 'info') || 'error'}
        // color={(product.status === 'sale' && 'error') || 'info'}
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        {place.rating > 4.5 ? 'Perfect' : 'Good'}
      </Label>
        {renderImg}
      </Box>

      <Box display='flex' justifyContent="space-between" alignItems='center' p={3}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {place?.title}
        </Link>

        <IconButton onClick={handleOpenPopover}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" pb={3} pl={3}>
          {place?.location}
      </Box>

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
          <MenuItem onClick={() => updatePlaceHandler()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => deletePlaceHandler()} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </Card>
  );
}
