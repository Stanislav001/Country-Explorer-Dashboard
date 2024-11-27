import { Helmet } from 'react-helmet-async';

import { UpdateCountryView } from 'src/sections/countries/update-country/update-country-view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Update Countries</title>
            </Helmet>

            <UpdateCountryView />
        </>
    );
}