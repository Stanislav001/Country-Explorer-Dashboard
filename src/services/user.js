/* eslint-disable no-else-return */
/* eslint-disable no-useless-catch */
import { request } from "../helpers/request";

const userService = {
    getUsers: async (authToken) => {
        try {
            const response = await request.get('/admin/users', {
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
    getUser: async (id, authToken) => {
        try {
            const response = await request.get(`/admin/users/${id}`, {
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
    deleteUser: async (id, authToken) => {
        try {
            const response = await request.delete('/admin/users', {
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
    addUser: async (values, authToken) => {
        try {
            const response = await request.post(
                '/admin/users',
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
    updateUser: async (values, authToken, countryId) => {
        try {
            const response = await request.put(
                '/admin/users',
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

export default userService;