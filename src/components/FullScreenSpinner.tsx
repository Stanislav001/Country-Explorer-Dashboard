import { Box, CircularProgress } from '@mui/material';

export default function FullScreenSpinner() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'white',
            borderRadius: '50%',
            animation: 'bounce 1.5s infinite ease-in-out',
            '@keyframes bounce': {
              '0%, 80%, 100%': {
                transform: 'scale(0)',
              },
              '40%': {
                transform: 'scale(1)',
              },
            },
            animationDelay: '0s',
          }}
        />
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'white',
            borderRadius: '50%',
            animation: 'bounce 1.5s infinite ease-in-out',
            '@keyframes bounce': {
              '0%, 80%, 100%': {
                transform: 'scale(0)',
              },
              '40%': {
                transform: 'scale(1)',
              },
            },
            animationDelay: '0.3s',
          }}
        />
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'white',
            borderRadius: '50%',
            animation: 'bounce 1.5s infinite ease-in-out',
            '@keyframes bounce': {
              '0%, 80%, 100%': {
                transform: 'scale(0)',
              },
              '40%': {
                transform: 'scale(1)',
              },
            },
            animationDelay: '0.6s',
          }}
        />
      </Box>
    </Box>
  );
};
