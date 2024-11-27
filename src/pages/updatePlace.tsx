import { Helmet } from 'react-helmet-async';

import { UpdatePlaceView } from 'src/sections/places/update-place';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Update Places</title>
            </Helmet>

            <UpdatePlaceView />
        </>
    );
}