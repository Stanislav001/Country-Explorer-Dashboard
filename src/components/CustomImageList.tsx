/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable perfectionist/sort-imports */
import {
    ImageList,
    ImageListItem,
    IconButton,
    Box,
    InputLabel,
    Typography,
} from '@mui/material';

import { SvgColor } from 'src/components/svg-color';
import ImageUpload from './ImageUpload';

export default function CustomImageList({ label, images, handleImageUpload, removeImageHandler }: { label: string; images: any; handleImageUpload: (files: FileList) => void; removeImageHandler : () => void }) {
    return (
        <>
            <InputLabel sx={{ py: 1 }}>Images</InputLabel>
            <ImageList cols={6}>
                {images?.map((item: any, index: number) => (
                    <Box key={index} position="relative">
                        <ImageListItem>
                            <Box sx={{cursor: 'pointer', padding: 1 }}>
                                <img
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: 150,
                                    }}
                                    src={item?.name ? URL.createObjectURL(item) : item?.image_url || item}
                                    alt={item?.title}
                                    loading="lazy"
                                />
                            </Box>
                            
                            <IconButton
                                onClick={() => removeImageHandler()}
                                style={{ position: 'absolute', top: 0, right: 0 }}
                            >
                                <SvgColor width="24px" height="24px" src="/assets/icons/trash-icon.svg" sx={{ color: 'red' }} />
                            </IconButton>
                        </ImageListItem>
                    </Box>
                ))}

                <ImageUpload
                    label={label}
                    onImageInputChange={(e) => {
                        if (e.target.files) {
                            handleImageUpload(e.target.files);
                        }
                    }}
                />
            </ImageList>

            {images?.length === 0 ? (
                <Box display="flex" alignItems="center" pt={1}>
                    <Typography variant="subtitle2" fontSize={14} color="text.secondary">
                        Please upload an image.
                    </Typography>
                </Box>
            ) : null }
        </>
    );
}
