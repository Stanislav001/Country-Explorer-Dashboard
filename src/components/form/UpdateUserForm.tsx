/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CustomImageList from '../CustomImageList';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';

import { useParams } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import userService from 'src/services/user';
import { useAuth } from 'src/context/auth-context';
import { useGetUser } from 'src/hooks/useGetUsers';
import useImageUploader from 'src/hooks/useImageUploader';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    role: Yup.string().required('Role is required'),
});

const UpdateUserForm = () => {
    const router = useRouter();
    const { id } = useParams();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { uploadImage, imageUrl, setImageUrl } = useImageUploader();
    const { currentToken, setErrorMessage, setSuccessMessage } = useAuth();
    const { data: user, isFetched: iUserFetched, refetch: refetchUser } = useGetUser(id, currentToken);
    
    useEffect(() => {
        if (iUserFetched && user?.user?.profile && setImageUrl) {
            setImageUrl(user?.user?.profile ?? "");
        }
    }, [iUserFetched, user]);

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

    const handleUpdateUser = async (values: any) => {
        setIsSubmitting(true);
        try {
            if (!imageUrl) {
                setErrorMessage('Profile image is required');
                setIsSubmitting(false);
                return;
            }

            values.profile = imageUrl ?? user?.user?.profile;

            const result = await userService.updateUser(values, currentToken, id);

            if (result.status) {
                setErrorMessage('');
                setSuccessMessage('User updated successfully');
                await refetchUser();
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

    if (!iUserFetched) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Formik
                initialValues={{
                    username: user?.user?.username || '',
                    email: user?.user?.email || '',
                    role: user?.user?.role || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateUser}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
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
                                        <MenuItem key="user" value="user">User</MenuItem>
                                        <MenuItem key="admin" value="admin">Admin</MenuItem>
                                    </Select>
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
                                    Update User
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default UpdateUserForm;