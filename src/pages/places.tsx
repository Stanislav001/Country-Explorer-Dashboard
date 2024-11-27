import { Helmet } from 'react-helmet-async';

import { PlaceView } from 'src/sections/places/view/index';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Places</title>
            </Helmet>

            <PlaceView />
        </>
    );
}