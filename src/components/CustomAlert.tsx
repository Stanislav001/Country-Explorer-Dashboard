/* eslint-disable perfectionist/sort-imports */
import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from 'src/context/auth-context';

type CustomAlertProps = {
    message: string;
    type: string;
};

const CustomAlert = ({ message, type }: CustomAlertProps) => {
    const [open, setOpen] = useState(true);
    const { setErrorMessage, setSuccessMessage } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            setErrorMessage('');
            setSuccessMessage('');
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, setErrorMessage, setSuccessMessage]);

    return (
        <Snackbar open={open} onClose={() => setOpen(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Alert
                onClose={() => setOpen(false)}
                severity={type === 'success' ? 'success' : 'error'}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;