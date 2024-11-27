/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query';
import placeService from 'src/services/place';

export const useGetPlaces = (authToken: any) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['places'],
        queryFn: () => placeService.getPlaces(authToken),
        // keepPreviousData: false,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};

export const useGetPlace = (id: any, authToken: any) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['place', id],
        queryFn: () => placeService.getPlace(id, authToken),
        enabled: !!id,
        // keepPreviousData: false,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};