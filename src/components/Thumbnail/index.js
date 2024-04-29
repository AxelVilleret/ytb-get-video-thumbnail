import React, { useEffect, useState, useRef } from 'react';
import { getVideoDetails } from '../../services/GetVideoDetailsService';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';


function Thumbnail() {

    const monElementRef = useRef(null);

    const telechargerImage = () => {
        // URL du serveur proxy que vous avez créé
        const proxyUrl = 'http://localhost:5000/proxy';

        // Obtenir les éléments img dans le composant
        const imageElements = monElementRef.current.querySelectorAll('img');

        // Construire les URL complètes avec le serveur proxy pour chaque image
        const thumbnailImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(videoDetails.thumbnailUrl)}`;
        const profileImageUrl = `${proxyUrl}?image_url=${encodeURIComponent(videoDetails.profilePictureUrl)}`;

        // Modifier les éléments img pour utiliser les URL du proxy
        imageElements[0].src = thumbnailImageUrl;
        imageElements[1].src = profileImageUrl;

        // Attendre que les deux images soient chargées avant de capturer le canvas
        Promise.all(Array.from(imageElements).map(img => new Promise(resolve => {
            img.onload = resolve;
        }))).then(() => {
            html2canvas(monElementRef.current, {
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

    const [videoDetails, setVideoDetails] = useState({});
    const [styles, setStyles] = useState({
        videoThumbnail: {
            width: '400px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        img: {
            width: '100%',
            height: 'auto',
        },
        h2: {
            margin: 0,
            fontSize: '18px',
            color: '#333',
        },
        p: {
            margin: '5px 0 0',
            fontSize: '14px',
            color: '#666',
        },
        uploaderProfile: {
            width: '50px',
            height: 'auto',
            borderRadius: '50%',
            marginRight: '5px'
        },
        uploaderInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        uploaderContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px'
        },
        bottomLeftElement: { // Style pour l'élément en bas à gauche
            position: 'absolute',
            right: '10px',
            bottom: '10px',
            backgroundColor: 'rgb(0, 0, 0)', // Ajoutez une couleur de fond ici
            color: 'white', // Ajoutez une couleur de texte ici
            borderRadius: '5px', // Ajoutez un rayon de bordure ici
            padding: '0 5px 2px 5px', // Ajoutez un remplissage ici
            // Ajoutez d'autres styles pour cet élément ici
        },
        imageDiv: {
            position: 'relative' // Ajout de la propriété de position ici

        }
    });

    useEffect(() => {
        const getDetails = async () => {
            const res = await getVideoDetails('BX7LyhtBqhk');
            setVideoDetails(res);
        }

        getDetails();
    }, []);



    return (
        !videoDetails ? <p>Loading...</p> :
            <>
                <div style={styles.videoThumbnail} ref={monElementRef}>
                    <div style={styles.imageDiv}>
                        <img src={videoDetails.thumbnailUrl} alt="Video Thumbnail" style={styles.img} />
                        <div style={styles.bottomLeftElement}>
                            {videoDetails.duration ? videoDetails.duration.join(':') : '0:00'}
                        </div>
                    </div>
                    <h2 style={styles.h2}>{videoDetails.title}</h2>


                    <div style={styles.uploaderContainer}>
                        <img src={videoDetails.profilePictureUrl} alt="Uploader Profile" style={styles.uploaderProfile} />
                        <div style={styles.uploaderInfo}>
                            <p style={styles.p}>{videoDetails.uploader}</p>
                            <p style={styles.p}>{videoDetails.views < 1000 ? videoDetails.views : videoDetails.views < 1000000 ? Math.floor(videoDetails.views / 1000) + ' k' : Math.floor(videoDetails.views / 1000000) + ' M'} vues • Il y a {videoDetails.daysSincePublished <= 30 ? videoDetails.daysSincePublished + ' jours' : videoDetails.daysSincePublished <= 365 ? Math.floor(videoDetails.daysSincePublished / 30) + ' mois' : Math.floor(videoDetails.daysSincePublished / 365) + ' ans'}</p>
                        </div>
                    </div>


                </div>

                <Button variant="outlined" onClick={telechargerImage}>Outlined</Button>
            </>
            
    );
}

export default Thumbnail;
