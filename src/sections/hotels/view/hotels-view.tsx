/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-imports */
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { HotelItem } from '../hotel-item';
import { DashboardContent } from 'src/layouts/dashboard';
import FullScreenSpinner from 'src/components/FullScreenSpinner';

import { useAuth } from 'src/context/auth-context';
import { useGetHotels } from 'src/hooks/useGetHotels';

export function HotelView() {
  const router = useRouter();
  const { currentToken } = useAuth();

  // Track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch hotels for the current page
  const { data: hotels, isFetched: isHotelsFetched } = useGetHotels(currentToken, currentPage);

  if (!isHotelsFetched) {
    return <FullScreenSpinner />;
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Hotels
        </Typography>
        <Button
          onClick={() => router.push('/create-countries')}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New hotel
        </Button>
      </Box>

      <Grid container spacing={3}>
        {hotels?.hotels.map((hotel: any) => (
          <Grid key={hotel._id} xs={12} sm={6} md={3}>
            <HotelItem hotel={hotel} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={hotels?.meta?.totalPages || 1}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 8, mx: 'auto' }}
      />
    </DashboardContent>
  );
}
