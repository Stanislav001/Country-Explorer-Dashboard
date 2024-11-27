import { Helmet } from 'react-helmet-async';

import { CountryView } from 'src/sections/countries/view/countries-view';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Countries</title>
            </Helmet>
            <CountryView />
        </>
    );
}