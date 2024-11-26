/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { loginUser } from 'src/services/auth';
import { useAuth } from 'src/context/auth-context';

import { Iconify } from 'src/components/iconify';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    email: Yup.string().email('Provide a valid email').required('Required'),
});

const SignInForm = () => {
    const router = useRouter();
    const { changeCurrentUser } = useAuth();

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = useCallback(
        async (values: any) => {
            try {
                const result = await loginUser(values);

                if (result?.status === 200) {
                    await changeCurrentUser(result?.data?.token);
                    router.push('/');
                }
            } catch (error) {
                setErrorMessage(error.message || "Email or password is incorrect");
            }
        },
        [router, changeCurrentUser]
    );

    return (
        <Formik
            initialValues={{ email: 'admin@admin.com', password: 'password' }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
        >
            {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Field name="email">
                            {({ field }: any) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email address"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 3 }}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            )}
                        </Field>

                        <Field name="password">
                            {({ field }: any) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    <Iconify
                                                        icon={
                                                            showPassword
                                                                ? 'solar:eye-bold'
                                                                : 'solar:eye-closed-bold'
                                                        }
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 3 }}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            )}
                        </Field>

                        {errorMessage ? <Box sx={{ color: 'error.main', mb: 3, display: 'flex', justifyContent: 'center' }}>{errorMessage}</Box> : null}

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            color="inherit"
                            variant="contained"
                        >
                            Sign in
                        </LoadingButton>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SignInForm;
