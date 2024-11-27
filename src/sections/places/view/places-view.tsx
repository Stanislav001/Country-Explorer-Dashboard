/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable perfectionist/sort-imports */
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { PlaceItem } from '../place-item';
import { DashboardContent } from 'src/layouts/dashboard';

import { useAuth } from 'src/context/auth-context';
import { useGetCountries } from 'src/routes/hooks/useGetCountries';
import { useGetPlaces } from 'src/routes/hooks/useGetPlaces';

export function PlaceView() {
  const router = useRouter();
  const { currentToken } = useAuth();
  const { data: places } = useGetPlaces(currentToken);

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

      <Grid container spacing={3}>
        {places?.places.map((place : any) => (
          <Grid key={place._id} xs={12} sm={6} md={3}>
            <PlaceItem place={place} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}