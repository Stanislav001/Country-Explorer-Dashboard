import { SvgColor } from 'src/components/svg-color';

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/users',
    icon: icon('ic-user'),
  },
  {
    title: 'Countries',
    path: '/countries',
    icon: icon('country-icon'),
  },

  {
    title: 'Places',
    path: '/places',
    icon: icon('place-icon'),
  },

  {
    title: 'Bookings',
    path: '/bookings',
    icon: icon('booking-icon'),
  },

  {
    title: 'Hotels',
    path: '/hotels',
    icon: icon('hotel-icon'),
  },
];
