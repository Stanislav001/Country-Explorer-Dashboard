/* eslint-disable perfectionist/sort-imports */
import React from 'react';
import { Box, IconButton, Button, FormLabel, } from '@mui/material';
// import BackupIcon from '@mui/icons-material/Backup';

export default function ImageUpload({ onImageInputChange, label } : { onImageInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void, label: string }) {
    return (
        <FormLabel
            hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                borderStyle: 'dashed',
                justifyContent: 'center',
                border: '2px dashed #E5E5E5',
                padding: 10,
                height: 150,
            }}
        >
            <Box display="flex" flexWrap="wrap" sx={{ paddingRight: 1, textAlign: 'center' }}>
                <Box display='flex' flexDirection='column'>
                    <IconButton component="label" style={{ background: 'none' }}>
                        {/* <BackupIcon style={{ color: '#1761fd' }} fontSize="large" /> */}
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={onImageInputChange}
                        />
                    </IconButton>

                    <Button style={{ color: '#8997bd' }} component="label" variant="text"  >
                        {label}
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={onImageInputChange}
                        />
                    </Button>
                </Box>
            </Box>
        </FormLabel>
    );
}