import { useState } from "react";
import { copyImageToClipboard, downloadImage } from "../services/ImageService";

interface VideoDetails {
    thumbnailUrl: string;
    profilePictureUrl: string;
}

type RefObject<T> = {
    current: T | null;
};

const useImageOperations = (
    cardRef: RefObject<HTMLDivElement>,
    videoDetails: VideoDetails | null
) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isValidDownload, setIsValidDownload] = useState(false);
    const [isValidCopy, setIsValidCopy] = useState(false);

    const performOperation = async (
        operation: (ref: RefObject<HTMLDivElement>, thumbnailUrl: string, profilePictureUrl: string) => Promise<void>,
        validator: (status: boolean) => void,
        loader: (loading: boolean) => void
    ) => {
        if (!videoDetails) return;
        loader(true);
        await operation(cardRef, videoDetails.thumbnailUrl, videoDetails.profilePictureUrl);
        loader(false);
        validateOperation(validator);
    };

    const validateOperation = (updateValidationStatus: (status: boolean) => void) => {
        updateValidationStatus(true);
        setTimeout(() => {
            updateValidationStatus(false);
        }, 3000);
    };

    const downloadImageDiv = async () => {
        await performOperation(downloadImage, setIsValidDownload, setIsDownloading);
    };

    const copyImageDiv = async () => {
        await performOperation(copyImageToClipboard, setIsValidCopy, setIsCopying);
    };

    return {
        isDownloading,
        isCopying,
        isValidDownload,
        isValidCopy,
        downloadImageDiv,
        copyImageDiv
    };
};

export default useImageOperations;
