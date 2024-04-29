import html2canvas from 'html2canvas';

const downloadImage = (cardRef, thumbnailUrl, profilePictureUrl) => {
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
    Promise.all(Array.from(imageElements).map(img => new Promise(resolve => {
        img.onload = resolve;
    }))).then(() => {
        html2canvas(cardRef.current, {
            useCORS: true,
            allowTaint: false
        }).then(canvas => {
            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.download = 'thumbnail.png';
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }, 'image/png');
        });
    });
};

export { downloadImage };