/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable perfectionist/sort-imports */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'src/routes/hooks';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import AddUserForm from 'src/components/form/AddUserForm';

export function AddUserView() {
    const router = useRouter();

    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Users / Add new user
                </Typography>
                <Button
                    onClick={() => router.push('/users')}
                    variant="contained"
                    color="inherit"
                >
                    Go Back
                </Button>
            </Box>

            <Grid container spacing={3}>
                <AddUserForm />
            </Grid>
        </DashboardContent>
    );
}