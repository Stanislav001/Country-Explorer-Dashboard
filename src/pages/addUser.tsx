import { Helmet } from 'react-helmet-async';

import { AddUserView } from 'src/sections/user/add-user';

export default function Page() {
    return (
        <>
            <Helmet>
                <title>Create User</title>
            </Helmet>
            <AddUserView />
        </>
    );
}