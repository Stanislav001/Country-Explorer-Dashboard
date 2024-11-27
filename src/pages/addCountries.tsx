import { Helmet } from 'react-helmet-async';

import { AddCountryView } from 'src/sections/countries/add-country/add-country-view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Create Countries</title>
            </Helmet>
            <AddCountryView />
        </>
    );
}