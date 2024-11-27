import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useRouter } from 'src/routes/hooks';
import { useAuth } from 'src/context/auth-context';
import placeService from 'src/services/place';
import { useGetCountries } from 'src/routes/hooks/useGetCountries';
import { useGetPlace } from 'src/routes/hooks/useGetPlaces';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
    country_id: Yup.string().required('Country is required'),
    country_name: Yup.string().required('Country name is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    contact_id: Yup.string().required('Contact ID is required'),
    imageUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    rating: Yup.number().required('Rating is required').min(1).max(5),
    location: Yup.string().required('Location is required'),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
    popular: Yup.array().of(Yup.string()).required('Popular places are required'),
    confirmed: Yup.boolean().required('Confirmation status is required'),
});

const UpdatePlaceForm = () => {
    const router = useRouter();
    const { id } = useParams();
    const { currentToken } = useAuth();

    const { data: countries } = useGetCountries(currentToken);
    const { data: place, isFetched: isPlaceFetched, refetch: refetchPlace } = useGetPlace(id, currentToken);

    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdatePlace = async (values: any) => {
        setIsSubmitting(true);
        try {
            const result = await placeService.updatePlace(values, currentToken, place?.place?._id);

            if (result.status) {
                setErrorMessage('');
                await refetchPlace();
                router.push('/places');
            } else {
                setErrorMessage(result.message || 'Failed to create place');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to create place');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isPlaceFetched) {
        return <Box>Loading...</Box>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Formik
                initialValues={{
                    country_id: place?.place?.country_id || '',
                    country_name: place?.place?.country_name || '',
                    title: place?.place?.title || '',
                    description: place?.place?.description || '',
                    contact_id: place?.place?.contact_id || '',
                    imageUrl: place?.place?.imageUrl || '',
                    rating: place?.place?.rating || 0,
                    location: place?.place?.location || '',
                    latitude: place?.place?.latitude || 0,
                    longitude: place?.place?.longitude || 0,
                    confirmed: Boolean(place?.place?.confirmed) || false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('values');
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <FormControl fullWidth error={touched.country_id && Boolean(errors.country_id)}>
                                    <InputLabel>Country</InputLabel>
                                    <Select
                                        name="country_id"
                                        value={values.country_id}
                                        onChange={(e) => {
                                            const selectedCountryId = e.target.value;
                                            const selectedCountryName = countries?.countries?.find(
                                                (country: any) => country._id === selectedCountryId
                                            )?.country;

                                            handleChange('country_id')(selectedCountryId);
                                            handleChange('country_name')(selectedCountryName || '');
                                        }}
                                        defaultValue={values.country_id}
                                        onBlur={handleBlur}
                                        label="Country"
                                    >
                                        {countries?.countries?.map((country: any) => (
                                            <MenuItem key={country._id} value={country._id}>
                                                {country.country}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </Grid>

                            {/* Title */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="title">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Place Title"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.title && Boolean(errors.title)}
                                            helperText={touched.title && errors.title}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Location */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="location">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Location"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.location && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Latitude */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="latitude">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Latitude"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            error={touched.latitude && Boolean(errors.latitude)}
                                            helperText={touched.latitude && errors.latitude}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Longitude */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="longitude">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Longitude"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            error={touched.longitude && Boolean(errors.longitude)}
                                            helperText={touched.longitude && errors.longitude}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Rating */}
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                <Field name="rating">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Rating (1-5)"
                                            InputLabelProps={{ shrink: true }}
                                            type="number"
                                            error={touched.rating && Boolean(errors.rating)}
                                            helperText={touched.rating && errors.rating}
                                            inputProps={{
                                                inputMode: 'numeric',
                                                min: 1,
                                                max: 5
                                            }}
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

                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Box sx={{ color: 'error.main', mb: 2 }}>{errorMessage}</Box>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    color="inherit"
                                    variant="contained"
                                    onClick={() => handleUpdatePlace(values)}
                                    loading={isSubmitting}
                                >
                                    Update Place
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default UpdatePlaceForm;