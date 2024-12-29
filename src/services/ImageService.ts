import html2canvas from 'html2canvas';
import { RefObject } from 'react';

const handleCanvasOperation = async (
    cardRef: RefObject<HTMLDivElement | null>,
    thumbnailUrl: string,
    profilePictureUrl: string,
    operation: (canvas: HTMLCanvasElement) => void
): Promise<void> => {
    await swapImages(thumbnailUrl, profilePictureUrl, cardRef);
    await document.fonts.ready; 
    const canvas = await html2canvas(cardRef.current!, {
        useCORS: true,
        allowTaint: false
    });
    operation(canvas);
};

const downloadImage = async (
    cardRef: RefObject<HTMLDivElement | null>,
    thumbnailUrl: string,
    profilePictureUrl: string
): Promise<void> => {
    await handleCanvasOperation(cardRef, thumbnailUrl, profilePictureUrl, (canvas) => {
        canvas.toBlob((blob) => {
            if (blob) {
                const link = document.createElement('a');
                link.download = 'thumbnail.png';
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }
        }, 'image/png');
    });
};

const copyImageToClipboard = async (
    cardRef: RefObject<HTMLDivElement | null>,
    thumbnailUrl: string,
    profilePictureUrl: string
): Promise<void> => {
    await handleCanvasOperation(cardRef, thumbnailUrl, profilePictureUrl, async (canvas) => {
        canvas.toBlob(async (blob) => {
            if (blob) {
                const clipboardItem = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([clipboardItem]);
            }
        }, 'image/png');
    });
};

const swapImages = async (
    thumbnailUrl: string,
    profilePictureUrl: string,
    cardRef: RefObject<HTMLDivElement | null>
): Promise<void> => {
    const proxyUrl = `${process.env.REACT_APP_PROXY_URL}/proxy`;
    const imageElements = cardRef.current?.querySelectorAll('img');
    const thumbnailImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(thumbnailUrl)}`;
    const profileImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(profilePictureUrl)}`;

    if (imageElements) {
        imageElements[0].src = thumbnailImageUrl;
        if (imageElements.length > 1)
            imageElements[1].src = profileImageUrl;

        await Promise.all(Array.from(imageElements).map(img => new Promise(resolve => {
            img.onload = resolve;
        })));
    }
};

export { downloadImage, copyImageToClipboard };
