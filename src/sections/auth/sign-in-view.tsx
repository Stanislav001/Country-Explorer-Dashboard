import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SignInForm from 'src/components/form/SignInForm';

export function SignInView() {
  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email and password to sign in.
        </Typography>
      </Box>

      <SignInForm />
    </>
  );
}
