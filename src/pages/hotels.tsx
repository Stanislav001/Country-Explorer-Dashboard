import { Helmet } from 'react-helmet-async';

import { HotelView } from 'src/sections/hotels/view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Hotels</title>
            </Helmet>
            <HotelView />
        </>
    );
}