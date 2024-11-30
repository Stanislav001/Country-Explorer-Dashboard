/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { useQuery } from '@tanstack/react-query';
import countryService from 'src/services/country';

export const useGetCountries = (authToken: any) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['countries'],
        queryFn: () => countryService.getCountries(authToken),
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};

export const useGetCountry = (id: any, authToken: any) => {
    const { data, isFetched, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: ['country', id],
        queryFn: () => countryService.getCountry(id, authToken),
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });

    return { data, isFetched, isLoading, error, refetch, isFetching };
};