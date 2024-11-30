import { Helmet } from 'react-helmet-async';

import { UpdateHotelView } from 'src/sections/hotels/update-hotel/update-hotel-view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Update Hotels</title>
            </Helmet>

            <UpdateHotelView />
        </>
    );
}