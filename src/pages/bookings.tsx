import { Helmet } from 'react-helmet-async';

import { BookingView } from 'src/sections/booking/view/booking-view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Bookings</title>
            </Helmet>

            <BookingView />
        </>
    );
}