import { Helmet } from 'react-helmet-async';

import { AddPlaceView } from 'src/sections/places/add-place';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Create Place</title>
            </Helmet>
            <AddPlaceView />
        </>
    );
}