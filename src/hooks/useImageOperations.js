import { useState } from "react";
import { copyImageToClipboard, downloadImage } from "../services/ImageService";

const useImageOperations = (cardRef, videoDetails) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isValidDownload, setIsValidDownload] = useState(false);
    const [isValidCopy, setIsValidCopy] = useState(false);

    const performOperation = async (operation, validator, loader) => {
        loader(true);
        await operation(cardRef, videoDetails.thumbnailUrl, videoDetails.profilePictureUrl);
        loader(false);
        validateOperation(validator);
    }

    const validateOperation = (updateValidationStatus) => {
        updateValidationStatus(true);
        setTimeout(() => {
            updateValidationStatus(false);
        }, 3000);
    }

    const downloadImageDiv = async () => {
        if (!videoDetails) return;
        await performOperation(downloadImage, setIsValidDownload, setIsDownloading);
    }

    const copyImageDiv = async () => {
        if (!videoDetails) return;
        await performOperation(copyImageToClipboard, setIsValidCopy, setIsCopying);
    }

    return {
        isDownloading,
        isCopying,
        isValidDownload,
        isValidCopy,
        downloadImageDiv,
        copyImageDiv
    };
}

export default useImageOperations;