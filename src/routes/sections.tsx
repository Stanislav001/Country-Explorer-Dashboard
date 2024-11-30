import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { useAuth } from 'src/context/auth-context';
import { DashboardLayout } from 'src/layouts/dashboard';

import CustomAlert from 'src/components/CustomAlert';
// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// Countries 
export const CountriesPage = lazy(() => import('src/pages/countries'));
export const AddCountryPage = lazy(() => import('src/pages/addCountries'));
export const UpdateCountryView = lazy(() => import('src/pages/updateCountries'));

// Places
export const PlacesPage = lazy(() => import('src/pages/places'));
export const AddPlacePage = lazy(() => import('src/pages/addPlace'));
export const UpdatePlacePage = lazy(() => import('src/pages/updatePlace'));

// Users
export const UsersPage = lazy(() => import('src/pages/user'));
export const AddUserPage = lazy(() => import('src/pages/addUser'));
export const UpdateUserPage = lazy(() => import('src/pages/updateUser'));

// Bookings
export const BookingsPage = lazy(() => import('src/pages/bookings'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  const { currentToken, errorMessage, successMessage } = useAuth();

  return (
    <>
      {errorMessage ? (
        <Box flexGrow={1} display="flex" justifyContent="flex-end">
          <CustomAlert message={errorMessage} type="error" />
        </Box>
      ) : successMessage ? (
        <Box flexGrow={1} display="flex" justifyContent="center">
          <CustomAlert message={successMessage} type="success" />
        </Box>
      ) : null}

      {useRoutes([
        {
          element: currentToken ? (
            <DashboardLayout>
              <Suspense fallback={renderFallback}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ) : (
            <Navigate to="/sign-in" replace />
          ),
          children: [
            { element: <HomePage />, index: true },
            { path: 'products', element: <ProductsPage /> },

            { path: 'countries', element: <CountriesPage /> },
            { path: '/create-countries', element: <AddCountryPage /> },
            { path: '/update-countries/:id', element: <UpdateCountryView /> },

            { path: 'places', element: <PlacesPage /> },
            { path: '/create-place', element: <AddPlacePage /> },
            { path: '/update-place/:id', element: <UpdatePlacePage /> },
            
            { path: 'users', element: <UsersPage /> },
            { path: '/create-user', element: <AddUserPage /> },
            { path: '/update-user/:id', element: <UpdateUserPage /> },

            { path: 'bookings', element: <BookingsPage /> },

            { path: 'blog', element: <BlogPage /> },
          ],
        },
        {
          path: 'sign-in',
          element: (
            <AuthLayout>
              <SignInPage />
            </AuthLayout>
          ),
        },
        {
          path: '404',
          element: <Page404 />,
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },
      ])}
    </>
  );
}
