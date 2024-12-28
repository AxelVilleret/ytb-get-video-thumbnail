import html2canvas from 'html2canvas';

const downloadImage = async (cardRef, thumbnailUrl, profilePictureUrl) => {
    await swapImages(thumbnailUrl, profilePictureUrl, cardRef)
    try {
        const canvas = await html2canvas(cardRef.current, {
            useCORS: true,
            allowTaint: false
        });
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = 'thumbnail.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/png');
    } catch (err) {
        console.error('Erreur lors du téléchargement de l\'image :', err);
    }
};

const copyImageToClipboard = async (cardRef, thumbnailUrl, profilePictureUrl) => {
    await swapImages(thumbnailUrl, profilePictureUrl, cardRef)
    try {
        const canvas = await html2canvas(cardRef.current, {
            useCORS: true,
            allowTaint: false
        });
        canvas.toBlob(async (blob) => {
            const clipboardItem = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([clipboardItem]);
        }, 'image/png');
    } catch (err) {
        console.error('Erreur lors de la copie de l\'image dans le presse-papier :', err);
    }
};

const swapImages = async (thumbnailUrl, profilePictureUrl, cardRef) => {
    const proxyUrl = `${process.env.REACT_APP_PROXY_URL}/proxy`;
    const imageElements = cardRef.current.querySelectorAll('img');
    const thumbnailImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(thumbnailUrl)}`;
    const profileImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(profilePictureUrl)}`;

    imageElements[0].src = thumbnailImageUrl;
    if (imageElements.length > 1)
        imageElements[1].src = profileImageUrl;
    
    await Promise.all(Array.from(imageElements).map(img => new Promise(resolve => {
        img.onload = resolve;
    })))
    
}

export { downloadImage, copyImageToClipboard };
