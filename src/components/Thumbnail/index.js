import React, { useEffect, useState, useRef } from 'react';
import { getVideoDetails } from '../../services/GetVideoDetailsService';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { downloadImage } from '../../services/DownloadImageService';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FilledButton } from '../custom/CustomButton';
import { Skeleton } from '@mui/material';


function Thumbnail({ videoId }) {

    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const downloadImageDiv = () => downloadImage(cardRef, videoDetails.thumbnailUrl, videoDetails.profilePictureUrl);

    const cardRef = useRef(null);

    const [videoDetails, setVideoDetails] = useState({});

    let viewsDisplay = undefined;
    let timeDisplay = undefined;

    if (videoDetails.views !== undefined) {
        let views = videoDetails.views;
        viewsDisplay = views < 1000 ? views : views < 1000000 ? Math.floor(views / 1000) + ' k' : Math.floor(views / 1000000) + ' M';
    }

    if (videoDetails.daysSincePublished !== undefined) {
        let daysSincePublished = videoDetails.daysSincePublished;
        timeDisplay = 'il y a ' + (daysSincePublished <= 30 ? daysSincePublished + ' jours' : daysSincePublished <= 365 ? Math.floor(daysSincePublished / 30) + ' mois' : Math.floor(daysSincePublished / 365) + ' ans');
    }

    let displayText = viewsDisplay ? viewsDisplay + ' vues • ' + timeDisplay : undefined;



    const [styles, setStyles] = useState({
        videoThumbnail: {
            // maxWidth: '400px',
            // minWidth: '300px',
            width: '350px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
        },
        img: {
            width: '100%',
            height: 'auto',
        },
        h2: {
            margin: 0,
            fontSize: '18px',
            color: '#333',
            padding: '10px',
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
            padding: '0px 10px 10px 10px'
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
        console.log('test');
        const getDetails = async () => {
            try {
                const details = await getVideoDetails(videoId, setIsLoading);
                setVideoDetails(details);
                setError(null);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        }

        getDetails();
    }, [videoId]);



    return (
        error && !isLoading ? <p>Error</p> :
            <div className='flex flex-col justify-center items-center gap-2'>
                <div style={styles.videoThumbnail} ref={cardRef}>
                    <div style={styles.imageDiv}>
                        {!isLoading ? (
                            <img src={videoDetails.thumbnailUrl} alt="Video Thumbnail" style={styles.img} />
                        ) : (
                            <Skeleton variant="rectangular" width={350} height={175} />
                        )}
                        <div style={styles.bottomLeftElement}>
                            {videoDetails.duration ? videoDetails.duration.join(':') : '0:00'}
                        </div>
                    </div>
                    <h2 style={styles.h2}>
                        {!isLoading ? videoDetails.title : <Skeleton variant="text" width={150} height={25} />}
                    </h2>

                    <div style={styles.uploaderContainer}>
                        {!isLoading ? (
                            <img src={videoDetails.profilePictureUrl} alt="Uploader Profile" style={styles.uploaderProfile} />
                        ) : (
                            <Skeleton variant="circular" width={50} height={50} />
                        )}
                        <div style={styles.uploaderInfo}>
                            <p style={styles.p}>
                                {!isLoading ? videoDetails.uploader : <Skeleton variant="text" width={100} height={18}/>}
                            </p>
                            <p style={styles.p}>
                                {!isLoading ? displayText : <Skeleton variant="text" width={100} height={18}/>}
                            </p>
                        </div>
                    </div>
                </div>

                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                >
                    <Button variant='outlined' onClick={downloadImageDiv} startIcon={<DownloadIcon />}>Télécharger</Button>
                    <FilledButton startIcon={<ContentCopyIcon />} >Copier</FilledButton>
                </ButtonGroup>

                
            </div>
            
    );
}

export default Thumbnail;
