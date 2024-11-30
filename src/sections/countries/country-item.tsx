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

import countryService from 'src/services/country';
import { useAuth } from 'src/context/auth-context';
import { useGetCountries } from 'src/hooks/useGetCountries';

export type CountryItemProps = {
  _id: string;
  country: string;
  imageUrl: string;
  confirmed: boolean
};

export function CountryItem({ country }: { country: CountryItemProps }) {
  const router = useRouter();
  const { currentToken, setErrorMessage, setSuccessMessage } = useAuth();
  
  const { refetch: refetchCountries } = useGetCountries(currentToken);
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const updateCountryHandler = () => {
    router.push(`/update-countries/${country._id}`);
    handleClosePopover();
  }

  const deleteCountryHandler = async () => {
    try {
      const result = await countryService.deleteCountry(country._id, currentToken);

      if (result.status) {
        await refetchCountries();
        setSuccessMessage(result?.message || "Country deleted successfully");
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
      alt={country?.country}
      src={country?.imageUrl ? country.imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9E-EVCmmhLN51ydEr1uFEgcur-yGtBNOaT83DaRj4-O_eAYWW8gaGsLad35PJTVPD8l0&usqp=CAU'}
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
        color={(country.confirmed && 'info') || 'error'}
        // color={(product.status === 'sale' && 'error') || 'info'}
        sx={{
          zIndex: 9,
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        {country.confirmed ? 'Confirmed' : 'Draft'}
      </Label>

        {renderImg}
      </Box>

      <Box display='flex' justifyContent="space-between" alignItems='center' p={3}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {country?.country}
        </Link>

        <IconButton onClick={handleOpenPopover}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

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
          <MenuItem onClick={() => updateCountryHandler()}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => deleteCountryHandler()} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </Card>
  );
}
