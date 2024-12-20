/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable perfectionist/sort-imports */
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { CountryItem } from '../country-item';
import { DashboardContent } from 'src/layouts/dashboard';
import FullScreenSpinner from 'src/components/FullScreenSpinner';

import { useAuth } from 'src/context/auth-context';
import { useGetCountries } from 'src/hooks/useGetCountries';

export function CountryView() {
  const router = useRouter();
  const { currentToken } = useAuth();
  const { data: countries, isFetched: isCountriesFetched } = useGetCountries(currentToken);

  if (!isCountriesFetched) {
    return <FullScreenSpinner />;
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Countries
        </Typography>
        <Button
          onClick={() => router.push('/create-countries')}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New country
        </Button>
      </Box>

      <Grid container spacing={3}>
        {countries?.countries.map((country : any) => (
          <Grid key={country._id} xs={12} sm={6} md={3}>
            <CountryItem country={country} />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
