/* eslint-disable no-else-return */
/* eslint-disable no-useless-catch */
import { request } from "../helpers/request";

const userService = {
    getUsers: async (authToken, filters) => {
        try {
            const queryParams = {};

            if (filters?.userRole !== 'all' && filters?.userRole) {
                queryParams.userRole = filters?.userRole;
            }

            if (filters?.userType !== 'all' && filters?.userType) {
                queryParams.userType = filters?.userType;
            }

            const response = await request.get('/admin/users', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: queryParams
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
                data: { userId: id },
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
                    username: values?.username,
                    email: values?.email,
                    password: values?.password,
                    role: values?.role,
                    profile: values?.profile,
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
            throw error?.response?.data?.message || "Something went wrong";
        }
    },
    updateUser: async (values, authToken, userId) => {
        try {
            const response = await request.put(
                '/admin/users',
                {
                    userId,
                    username: values?.username,
                    email: values?.email,
                    role: values?.role,
                    profile: values?.profile,
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