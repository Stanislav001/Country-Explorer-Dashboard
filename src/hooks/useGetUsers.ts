/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query';
import userService from 'src/services/user';

export const useGetUsers = (authToken: any, filters?: any) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['users-list', filters],
        queryFn: () => userService.getUsers(authToken, filters),
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};

export const useGetUser = (id: any, authToken: any) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.getUser(id, authToken),
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};