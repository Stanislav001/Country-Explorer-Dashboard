/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app';
import { AuthProvider } from './context/auth-context';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <Suspense>
              <App />
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  </QueryClientProvider>
);
