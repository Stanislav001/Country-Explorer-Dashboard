import { Helmet } from 'react-helmet-async';

import { UpdateUserView } from 'src/sections/user/update-user';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Update User</title>
            </Helmet>
            <UpdateUserView />
        </>
    );
}