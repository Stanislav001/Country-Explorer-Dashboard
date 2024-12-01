/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
import { useState } from 'react';

interface UseImageUploaderReturn {
    uploadImage: (file: File) => Promise<string | undefined>;
    uploading: boolean;
    imageUrl: string | null;
    error: string | null;
    removeImage: () => Promise<void>;
    setImageUrl?: (url: any) => void;
}

const useImageUploader = (): UseImageUploaderReturn => {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>("");
    const [error, setError] = useState<string | null>(null);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        console.error('Cloudinary configuration is missing in environment variables.');
    }

    const uploadImage = async (file: File): Promise<string | undefined> => {
        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Image upload failed.');
            }

            const data = await response.json();
            const uploadedImageUrl = data.secure_url;

            setImageUrl(uploadedImageUrl);
            return uploadedImageUrl;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = async (): Promise<void> => {
        setImageUrl("");
    }

    return { uploadImage, uploading, imageUrl, error, removeImage, setImageUrl };
};

export default useImageUploader;