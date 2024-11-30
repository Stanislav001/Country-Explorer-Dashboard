/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-duplicates */

import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import { SvgColor } from 'src/components/svg-color';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';

import { useRouter } from 'src/routes/hooks';
import hotelService from 'src/services/hotel';
import addHotelInitialValues from './hotelTypes';
import { useAuth } from 'src/context/auth-context';
import { addHotelValidationSchema } from './hotelTypes';

const AddHotelForm = () => {
    const router = useRouter();
    const { currentToken, setErrorMessage, setSuccessMessage } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateHotel = async (values: any) => {
        setIsSubmitting(true);
        try {
            const result = await hotelService.addHotel(values, currentToken);

            if (result.status) {
                setErrorMessage('');
                setSuccessMessage('Hotel created successfully');
                router.push('/hotels');
            } else {
                setErrorMessage(result.message || 'Failed to create hotel');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Failed to create hotel');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Formik
                initialValues={addHotelInitialValues}
                validationSchema={addHotelValidationSchema}
                onSubmit={handleCreateHotel}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {/* Title */}
                            <Grid item xs={12} sm={4}>
                                <Field name="title">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Hotel Title"
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.title && Boolean(errors.title)}
                                            helperText={touched.title && errors.title}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Price */}
                            <Grid item xs={12} sm={4}>
                                <Field name="price">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Price"
                                            type="number"
                                            error={touched.price && Boolean(errors.price)}
                                            helperText={touched.price && errors.price}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Category */}
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Category"
                                    >
                                        <MenuItem key="beachfront" value="Beachfront">Beachfront</MenuItem>
                                        <MenuItem key="luxury" value="Luxury">Luxury</MenuItem>
                                        <MenuItem key="cityCenter" value="City Center">City Center</MenuItem>
                                        <MenuItem key="boutique" value="Boutique">Boutique</MenuItem>
                                        <MenuItem key="historic" value="Historic">Historic</MenuItem>
                                        <MenuItem key="budget" value="Budget">Budget</MenuItem>
                                        <MenuItem key="riverside" value="Riverside">Riverside</MenuItem>
                                        <MenuItem key="resort" value="Resort">Resort</MenuItem>
                                    </Select>
                                    {touched.category && errors.category && (
                                        <div>{errors.category}</div>
                                    )}
                                </FormControl>
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

                            {/* Country */}
                            <Grid item xs={12} sm={4}>
                                <Field name="address.Country">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Country"
                                            error={touched.address?.Country && Boolean(errors.address?.Country)}
                                            helperText={touched.address?.Country && errors.address?.Country}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* City */}
                            <Grid item xs={12} sm={4}>
                                <Field name="address.City">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="City"
                                            error={touched.address?.City && Boolean(errors.address?.City)}
                                            helperText={touched.address?.City && errors.address?.City}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Address */}
                            <Grid item xs={12} sm={4}>
                                <Field name="address.StreetAddress">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Street Address"
                                            error={touched.address?.StreetAddress && Boolean(errors.address?.StreetAddress)}
                                            helperText={touched.address?.StreetAddress && errors.address?.StreetAddress}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Location Coordinates */}
                            <Grid item xs={12} sm={4}>
                                <Field name="location.coordinates[0]">
                                    {({ field, meta }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Latitude"
                                            type="number"
                                            error={Boolean(meta.touched && meta.error)}
                                            helperText={meta.touched && meta.error}
                                            margin="normal"
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Field name="location.coordinates[1]">
                                    {({ field, meta }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Longitude"
                                            type="number"
                                            error={Boolean(meta.touched && meta.error)}
                                            helperText={meta.touched && meta.error}
                                            margin="normal"
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Postal code */}
                            <Grid item xs={12} sm={4}>
                                <Field name="address.PostalCode">
                                    {({ field, meta }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Postal Code"
                                            error={Boolean(meta.touched && meta.error)}
                                            helperText={meta.touched && meta.error}
                                            margin="normal"
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Rating */}
                            <Grid item xs={12} sm={6}>
                                <Field name="rating">
                                    {({ field }: any) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Rating"
                                            type="number"
                                            inputProps={{ min: 1, max: 5 }}
                                            error={touched.rating && Boolean(errors.rating)}
                                            helperText={touched.rating && errors.rating}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Parking Included */}
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.parkingIncluded}
                                            onChange={handleChange}
                                            name="parkingIncluded"
                                        />
                                    }
                                    label="Parking Included"
                                />
                            </Grid>

                            {/* Image URL */}
                            <Grid item xs={12} sm={12}>
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

                            {/* Rooms */}
                            <Grid item xs={12}>
                                <FieldArray
                                    name="rooms"
                                    render={(arrayHelpers) => (
                                        <Box sx={{ p: 2, mt: 2 }} display="flex" flexWrap="wrap">
                                            <InputLabel id="rooms-label">Rooms</InputLabel>
                                            {values.rooms.map((room, index) => (
                                                <>
                                                    <Grid container spacing={2} key={index} style={{ marginTop: 1, alignItems: 'center' }}>
                                                        {/* Room Title */}
                                                        <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <TextField
                                                                fullWidth
                                                                label="Room Title"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                name={`rooms[${index}].title`}
                                                                value={values.rooms[index].title}
                                                                helperText={<ErrorMessage name={`rooms[${index}].title`} />}
                                                            />
                                                        </Grid>

                                                        {/* Room Description */}
                                                        <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <TextField
                                                                fullWidth
                                                                label="Room Description"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                name={`rooms[${index}].description`}
                                                                value={values.rooms[index].description}
                                                                helperText={<ErrorMessage name={`rooms[${index}].description`} />}
                                                            />
                                                        </Grid>

                                                        {/* Room Price */}
                                                        <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <TextField
                                                                fullWidth
                                                                label="Room Price"
                                                                type="number"
                                                                inputProps={{ min: 1 }}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                name={`rooms[${index}].price`}
                                                                value={values.rooms[index].price}
                                                                helperText={<ErrorMessage name={`rooms[${index}].price`} />}
                                                            />
                                                        </Grid>

                                                        {/* Sleeps Count */}
                                                        <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <TextField
                                                                fullWidth
                                                                label="Sleeps Count"
                                                                type="number"
                                                                inputProps={{ min: 1 }}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                name={`rooms[${index}].SleepsCount`}
                                                                value={values.rooms[index].SleepsCount}
                                                                helperText={<ErrorMessage name={`rooms[${index}].SleepsCount`} />}
                                                            />
                                                        </Grid>

                                                        {/* Image URL */}
                                                        <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <TextField
                                                                fullWidth
                                                                label="Image URL"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                name={`rooms[${index}].imageUrl`}
                                                                value={values.rooms[index].imageUrl}
                                                                helperText={<ErrorMessage name={`rooms[${index}].imageUrl`} />}
                                                            />
                                                        </Grid>
                                                        
                                                         {/* Room Rating */}
                                                         <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <TextField
                                                                fullWidth
                                                                label="Room Rating"
                                                                type="number"
                                                                inputProps={{ min: 1, max: 5 }}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                name={`rooms[${index}].rating`}
                                                                value={values.rooms[index].rating}
                                                                helperText={<ErrorMessage name={`rooms[${index}].rating`} />}
                                                            />
                                                        </Grid>

                                                        {/* Smoking Allowed */}
                                                        <Grid item xs={12} sm={4} md={2} lg={2}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={values.rooms[index].SmokingAllowed}
                                                                        onChange={handleChange}
                                                                        name={`rooms[${index}].SmokingAllowed`}
                                                                    />
                                                                }
                                                                label="Smoking Allowed"
                                                            />
                                                        </Grid>

                                                        {/* Remove Room Button */}
                                                        <Grid item xs={12} sm={1} md={1} lg={1}>
                                                            {index !== 0 && (
                                                                <IconButton onClick={() => arrayHelpers.remove(index)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <SvgColor width="24px" height="24px" src="/assets/icons/trash-icon.svg" sx={{ color: 'red' }} />
                                                                </IconButton>
                                                            )}
                                                        </Grid>
                                                    </Grid>

                                                    {values?.rooms?.length > 1 ? <Divider sx={{ width: "100%", my: 2 }} >
                                                        <Typography variant="caption" color="textSecondary">Room {index + 1}</Typography>
                                                    </Divider> : null}
                                                </>
                                            ))}

                                            {/* Add Room Button */}
                                            <Button
                                                onClick={() => arrayHelpers.push({
                                                    title: '',
                                                    description: '',
                                                    price: '',
                                                    SleepsCount: 1,
                                                    SmokingAllowed: false,
                                                    imageUrl: '',
                                                    rating: 1
                                                })}
                                            >
                                                Add Room
                                            </Button>
                                        </Box>
                                    )}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <LoadingButton
                                    fullWidth
                                    onClick={() => handleCreateHotel(values)}
                                    size="large"
                                    type="submit"
                                    color="inherit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Create Hotel
                                </LoadingButton>
                            </Grid>

                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddHotelForm;