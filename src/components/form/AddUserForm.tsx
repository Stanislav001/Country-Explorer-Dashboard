/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';

import ImageUpload from '../ImageUpload';
import userService from 'src/services/user';
import { useRouter } from 'src/routes/hooks';
import CustomImageList from '../CustomImageList';
import { useAuth } from 'src/context/auth-context';
import useImageUploader from 'src/hooks/useImageUploader';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    role: Yup.string().required('Role is required'),
});

const AddUserForm = () => {
    const router = useRouter();
    const { uploadImage, imageUrl, setImageUrl } = useImageUploader();
    const { currentToken, setErrorMessage, setSuccessMessage } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const removeImageHandler = () =>  {
        if (setImageUrl) {
            setImageUrl("");
        }
    }
    
    const onImageInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await uploadImage(file);
        }
    };

    const handleCreateUser = async (values: any) => {
        setIsSubmitting(true);
        
        try {
            if (!imageUrl) {
                setErrorMessage('Profile image is required');
                setIsSubmitting(false);
                return;
            }

            values.profile = imageUrl;
            const result = await userService.addUser(values, currentToken);

            if (result.status) {
                setErrorMessage('');
                setSuccessMessage('User created successfully');
                router.push('/users');
            } else {
                setErrorMessage(result?.message || 'Failed to create user');
            }
        } catch (error) {
            setErrorMessage(error || 'Failed to create user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    email: '',
                    role: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleCreateUser}
            >
                {({ values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {/* Username */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="username">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Username"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="email">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Email"
                                            type='email'
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Password */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="password">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Password"
                                            type='password'
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Role */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <FormControl fullWidth error={touched.role && Boolean(errors.role)}>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        name="role"
                                        value={values.role}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Role"
                                    >
                                        <MenuItem key="user" value="User">User</MenuItem>
                                        <MenuItem key="admin" value="Admin">Admin</MenuItem>
                                    </Select>
                                    {touched.role && errors.role && (
                                        <div>{errors.role}</div>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <CustomImageList
                                    label="Upload Profile Image"
                                    images={imageUrl ? [imageUrl] : []}
                                    handleImageUpload={(files) => {
                                        if (files) {
                                            onImageInputChange({ target: { files } } as any);
                                        }
                                    }}
                                    removeImageHandler={removeImageHandler}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="inherit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Create User
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddUserForm;