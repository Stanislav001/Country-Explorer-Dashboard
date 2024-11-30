import * as Yup from 'yup';

export interface Room {
    title: string;
    description: string;
    price: number;
    SleepsCount: number;
    SmokingAllowed: boolean;
    imageUrl: string;
    rating: number;
}

export interface FormValues {
    rooms: Room[];
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    parkingIncluded: boolean;
    rating: number;
    price: number;
    address: {
        StreetAddress: string;
        City: string;
        StateProvince: string;
        PostalCode: string;
        Country: string;
    };
    location: { coordinates: number[] };
}

const addHotelInitialValues: FormValues = {
    rooms: [
        {
            title: '',
            description: '',
            price: 0,
            SleepsCount: 1,
            SmokingAllowed: false,
            imageUrl: '',
            rating: 1,
        },
    ],
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    parkingIncluded: false,
    rating: 1,
    price: 0,
    address: {
        StreetAddress: '',
        City: '',
        StateProvince: '',
        PostalCode: '',
        Country: '',
    },
    location: { coordinates: [0, 0] }
};

export default addHotelInitialValues;

export const addHotelValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    imageUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    category: Yup.string().required('Category is required'),
    parkingIncluded: Yup.boolean(),
    rating: Yup.number().required('Rating is required').min(1).max(5),
    price: Yup.number().required('Price is required').positive(),
    address: Yup.object().shape({
        StreetAddress: Yup.string().required('Street Address is required'),
        City: Yup.string().required('City is required'),
        StateProvince: Yup.string().required('State/Province is required'),
        PostalCode: Yup.string().required('Postal Code is required'),
        Country: Yup.string().required('Country is required'),
    }),
    location: Yup.object().shape({
        coordinates: Yup.array().of(Yup.number()).min(2).required('Coordinates are required'),
    }),
    rooms: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required('Room title is required'),
            description: Yup.string().required('Room description is required'),
            price: Yup.number().required('Room price is required'),
            SleepsCount: Yup.number().required('Sleeps count is required').positive(),
            SmokingAllowed: Yup.boolean(),
            imageUrl: Yup.string().url('Must be a valid URL'),
            rating: Yup.number().min(1).max(5),
        })
    ),
});
