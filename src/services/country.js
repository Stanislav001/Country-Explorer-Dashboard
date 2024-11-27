/* eslint-disable no-else-return */
/* eslint-disable no-useless-catch */
import { request } from "../helpers/request";

const countryService = {
    getCountries: async (authToken) => {
        try {
            const response = await request.get('/admin/countries', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            throw error;
        }
    },
    getCountry: async (id, authToken) => {
        try {
            const response = await request.get(`/admin/countries/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            throw error;
        }
    },
    deleteCountry: async (id, authToken) => {
        try {
            const response = await request.delete('/admin/countries', {
                data: { countryId: id },
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            throw error;
        }
    },
    addCountry: async (values, authToken) => {
        try {
            const response = await request.post(
                '/admin/countries',
                {
                    country: values?.country,
                    description: values?.description,
                    imageUrl: values?.imageUrl,
                    region: values?.region,
                    confirmed: values?.confirmed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            throw error;
        }
    },
    updateCountry: async (values, authToken, countryId) => {
        try {
            const response = await request.put(
                '/admin/countries',
                {
                    countryId,
                    country: values?.country,
                    description: values?.description,
                    imageUrl: values?.imageUrl,
                    region: values?.region,
                    confirmed: values?.confirmed,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            throw error;
        }
    }
}

export default countryService;