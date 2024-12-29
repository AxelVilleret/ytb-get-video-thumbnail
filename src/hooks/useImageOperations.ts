import { RefObject, useState } from "react";
import { copyImageToClipboard, downloadImage } from "../services/ImageService";
import { VideoInfo } from "../services/GetVideoDetailsService";

const useImageOperations = (
    cardRef: RefObject<HTMLDivElement | null>,
    videoDetails: VideoInfo | null
) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isValidDownload, setIsValidDownload] = useState(false);
    const [isValidCopy, setIsValidCopy] = useState(false);

    const performOperation = async (
        operation: (ref: RefObject<HTMLDivElement | null>, thumbnailUrl: string, profilePictureUrl: string) => Promise<void>,
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
