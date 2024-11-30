/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable perfectionist/sort-imports */
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PlaceItem } from '../place-item';
import { useRouter } from 'src/routes/hooks';
import Grid from '@mui/material/Unstable_Grid2';
import { Iconify } from 'src/components/iconify';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';

import { useAuth } from 'src/context/auth-context';
import { useGetPlaces } from 'src/hooks/useGetPlaces';
import FullScreenSpinner from 'src/components/FullScreenSpinner';

import { PlaceFilters } from '../place-filters';
import { FiltersProps } from '../place-filters';
import { useGetCountries } from 'src/hooks/useGetCountries';

export function PlaceView() {
  const router = useRouter();
  const { currentToken } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>({ countries: '' });

  const { data: countries, isFetched: isCountriesFetched } = useGetCountries(currentToken);

  const COUNTRIES_OPTIONS = countries?.countries?.map((country: any) => ({
    value: country.country,
    label: country.country,
  })) || [];

  const { data: places, refetch: refetchPlaces, isFetched: isPlacesFetched } = useGetPlaces(currentToken, currentPage, filters);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSetFilters = useCallback(async (updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
    setCurrentPage(1);
    await refetchPlaces();
  }, [refetchPlaces]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    refetchPlaces();
  };

  if (!isPlacesFetched || !isCountriesFetched) {
    return <FullScreenSpinner />;
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Places
        </Typography>
        <Button
          onClick={() => router.push('/create-place')}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New place
        </Button>
      </Box>

      <Box display="flex" alignItems="center" flexWrap="wrap-reverse" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
          <PlaceFilters
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            options={{ countries: COUNTRIES_OPTIONS }}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {places?.places.map((place: any) => (
          <Grid key={place._id} xs={12} sm={6} md={3}>
            <PlaceItem place={place} refetchPlaces={refetchPlaces} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        color="primary"
        page={currentPage}
        sx={{ mt: 8, mx: 'auto' }}
        onChange={handlePageChange}
        count={places?.meta?.totalPages || 1}
      />
    </DashboardContent>
  );
}
