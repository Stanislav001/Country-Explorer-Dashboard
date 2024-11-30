/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-imports */
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import FullScreenSpinner from 'src/components/FullScreenSpinner';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

import { useAuth } from 'src/context/auth-context';
import { useGetUsers } from 'src/hooks/useGetUsers';
import { useGetHotels } from 'src/hooks/useGetHotels';
import { useGetBookings } from 'src/hooks/useGetBookings';
import { useGetCountries } from 'src/hooks/useGetCountries';

export function OverviewAnalyticsView() {
  const { currentUser, currentToken } = useAuth();

  const { data: users, isFetched: isUsersFetched } = useGetUsers(currentToken);
  const { data: countries, isFetched: isCountriesFetched } = useGetCountries(currentToken);
  const { data: bookings, isFetched: isBookingsFetched } = useGetBookings(currentToken);
  const { data: hotels, isFetched: isHotelsFetched } = useGetHotels(currentToken, 1);
  
  if (!isUsersFetched || !isCountriesFetched || !isBookingsFetched || !isHotelsFetched) {
    return <FullScreenSpinner />;
  }

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back {currentUser?.username} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Bookings"
            total={bookings?.length}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Users"
            total={users?.users?.length}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Countries"
            total={countries?.countries?.length}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Hotels"
            total={hotels?.meta?.totalHotels}
            color="error"
            icon={<img alt="icon" src="/assets/icons/navbar/hotel-icon.svg" />}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
