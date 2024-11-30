/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-useless-catch */
import { request } from "../helpers/request";

const hotelService = {
    getHotels: async (authToken, page = 1, limit = 12) => {
        try {
            const response = await request.get('/admin/hotels', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    page,
                    limit,
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
    getHotel: async (id, authToken) => {
        try {
            const response = await request.get(`/admin/hotels/${id}`, {
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
    addHotel: async (values, authToken) => {
        try {
            const response = await request.post(
                '/admin/hotels',
                {
                    rooms: values?.rooms,
                    title: values?.title,
                    description: values?.description,
                    imageUrl: values?.imageUrl,
                    category: values?.category,
                    parkingIncluded: values?.parkingIncluded,
                    rating: values?.rating,
                    price: values?.price,
                    address: {
                        StreetAddress: values?.address?.StreetAddress,
                        City: values?.address?.City,
                        StateProvince: values?.address?.StateProvince,
                        PostalCode: values?.address?.PostalCode,
                        Country: values?.address?.Country,
                    },
                    location: values?.location,
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

    updateHotel: async (values, authToken, hotelId) => {
        try {
            const response = await request.put(
                '/admin/hotels',
                {
                    hotelId,
                    rooms: values?.rooms,
                    title: values?.title,
                    description: values?.description,
                    imageUrl: values?.imageUrl,
                    category: values?.category,
                    parkingIncluded: values?.parkingIncluded,
                    rating: values?.rating,
                    price: values?.price,
                    address: {
                        StreetAddress: values?.address?.StreetAddress,
                        City: values?.address?.City,
                        StateProvince: values?.address?.StateProvince,
                        PostalCode: values?.address?.PostalCode,
                        Country: values?.address?.Country,
                    },
                    location: values?.location
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
    },

    deleteHotel: async (id, authToken) => {
        try {
            const response = await request.delete('/admin/hotels', {
                data:
                {
                    hotelId: id
                },
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
    }
};

export default hotelService;