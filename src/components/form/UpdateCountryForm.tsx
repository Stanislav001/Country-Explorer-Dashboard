import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import { useParams } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
import { useAuth } from 'src/context/auth-context';
import countryService from 'src/services/country';
import { useGetCountry } from 'src/routes/hooks/useGetCountries';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    country: Yup.string().required('Country name is required'),
    description: Yup.string().required('Description is required'),
    imageUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    region: Yup.string().required('Region is required'),
    confirmed: Yup.boolean().required('Confirmation status is required'),
});

const UpdateCountryForm = () => {
    const router = useRouter();
    const { id } = useParams();

    const { currentToken } = useAuth();
    const { data: country, isFetched: isCountryFetched, refetch: refetchCountry } = useGetCountry(id, currentToken);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdateCountry = async (values: any) => {
        setIsSubmitting(true);
        try {
            const result = await countryService.updateCountry(values, currentToken, country?.country?._id);

            if (result.status) {
                setErrorMessage('');
                await refetchCountry();
                router.push('/countries');
            } else {
                setErrorMessage(result.message || 'Failed to create country');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to create country');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isCountryFetched) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Formik
                initialValues={{
                    country: country?.country?.country || '',
                    description: country?.country?.description || '',
                    imageUrl: country?.country?.imageUrl || '',
                    region: country?.country?.region || '',
                    confirmed: Boolean(country?.country?.confirmed) || false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateCountry}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {/* Country Name */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="country">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Country Name"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.country && Boolean(errors.country)}
                                            helperText={touched.country && errors.country}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Region */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="region">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Region"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.region && Boolean(errors.region)}
                                            helperText={touched.region && errors.region}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Image URL */}
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <Field name="imageUrl">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Image URL"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.imageUrl && Boolean(errors.imageUrl)}
                                            helperText={touched.imageUrl && errors.imageUrl}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Description */}
                            <Grid item xs={12}>
                                <Field name="description">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Description"
                                            multiline
                                            rows={4}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.description && Boolean(errors.description)}
                                            helperText={touched.description && errors.description}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Confirmed */}
                            <Grid item xs={12}>
                                <Field name="confirmed">
                                    {({ field }: any) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...field}
                                                    checked={values.confirmed}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            }
                                            label="Confirmed"
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Error Message */}
                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Box sx={{ color: 'error.main', mb: 2 }}>{errorMessage}</Box>
                                </Grid>
                            )}

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
                                    Create Country
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default UpdateCountryForm;