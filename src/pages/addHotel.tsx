import { Helmet } from 'react-helmet-async';

import { AddHotelView } from 'src/sections/hotels/add-hotel';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Create Hotel</title>
            </Helmet>
            <AddHotelView />
        </>
    );
}