import html2canvas from 'html2canvas';

// Fonction pour télécharger l'image
const downloadImage = async (cardRef, controlLoading, thumbnailUrl, profilePictureUrl) => {
    await swapImages(thumbnailUrl, profilePictureUrl, cardRef)
    try {
        controlLoading(true);
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
            controlLoading(false);
        }, 'image/png');
    } catch (err) {
        console.error('Erreur lors du téléchargement de l\'image :', err);
        controlLoading(false);
    }
};

// Fonction pour copier l'image dans le presse-papier
const copyImageToClipboard = async (cardRef, controlLoading, thumbnailUrl, profilePictureUrl) => {
    await swapImages(thumbnailUrl, profilePictureUrl, cardRef)
    try {
        controlLoading(true);
        const canvas = await html2canvas(cardRef.current, {
            useCORS: true,
            allowTaint: false
        });
        canvas.toBlob(async (blob) => {
            const clipboardItem = new ClipboardItem({ "image/png": blob });
            await navigator.clipboard.write([clipboardItem]);
            console.log('Image copiée dans le presse-papier');
            controlLoading(false);
        }, 'image/png');
    } catch (err) {
        console.error('Erreur lors de la copie de l\'image dans le presse-papier :', err);
        controlLoading(false);
    }
};

const swapImages = (thumbnailUrl, profilePictureUrl, cardRef) => {
    // URL du serveur proxy que vous avez créé
    const proxyUrl = `${process.env.REACT_APP_PROXY_URL}/proxy`;

    // Obtenir les éléments img dans le composant
    const imageElements = cardRef.current.querySelectorAll('img');

    // Construire les URL complètes avec le serveur proxy pour chaque image
    const thumbnailImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(thumbnailUrl)}`;
    const profileImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(profilePictureUrl)}`;

    // Modifier les éléments img pour utiliser les URL du proxy
    imageElements[0].src = thumbnailImageUrl;
    imageElements[1].src = profileImageUrl;

    // Attendre que les deux images soient chargées avant de capturer le canvas
    return Promise.all(Array.from(imageElements).map(img => new Promise(resolve => {
        img.onload = resolve;
    })))
}


export { downloadImage, copyImageToClipboard };
