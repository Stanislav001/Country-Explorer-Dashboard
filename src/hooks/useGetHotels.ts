/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query';
import hotelService from 'src/services/hotel';

const HOTELS_PER_PAGE = 12;

export const useGetHotels = (authToken: string, page: number) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['hotels', page],
        queryFn: () => hotelService.getHotels(authToken, page, HOTELS_PER_PAGE),
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};

export const useGetHotel = (id: any, authToken: string) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['hotel', id],
        queryFn: () => hotelService.getHotel(id, authToken),
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};

export const useGetHotelsOptions = (authToken: string) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['hotels-options'],
        queryFn: () => hotelService.getHotelsOptions(authToken),
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};