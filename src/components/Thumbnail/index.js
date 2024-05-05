import React, { useEffect, useState, useRef, useContext } from 'react';
import { getVideoDetails } from '../../services/GetVideoDetailsService';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { downloadImage, copyImageToClipboard } from '../../services/ImageService';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FilledButton } from '../custom/CustomButton';
import { Skeleton } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import { Alert } from '@mui/material';

function Thumbnail({ videoId, progressPercent, isChannelImage, radiusSize }) {
    const theme = useTheme();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isCopying, setIsCopying] = useState(false);
    const [isValidDownload, setIsValidDownload] = useState(false);
    const [isValidCopy, setIsValidCopy] = useState(false);

    const validateOperation = (setIsValid) => {
        setIsValid(true);
        setTimeout(() => {
            setIsValid(false);
        }, 3000);
    }

    const downloadImageDiv = () => {
        downloadImage(cardRef, setIsDownloading, videoDetails.thumbnailUrl, videoDetails.profilePictureUrl);
        validateOperation(setIsValidDownload);
    }
    const copyImageDiv = () => {
        copyImageToClipboard(cardRef, setIsCopying, videoDetails.thumbnailUrl, videoDetails.profilePictureUrl);
        validateOperation(setIsValidCopy);
    }

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

    useEffect(() => {
        const getDetails = async () => {
            try {
                console.log('videoId', videoId);
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
        error && !isLoading ?
            <Alert severity="error" variant="outlined">{ error.message}</Alert>
            :
            <div className='flex flex-col justify-center items-center gap-2'>
                <div className={`w-80 border border-gray-300 rounded${radiusSize} overflow-hidden flex flex-col items-start text-left ${theme.palette.mode === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-white'}`} ref={cardRef}>
                    <div className='relative'>
                        {!isLoading ? (
                            <img src={videoDetails.thumbnailUrl} alt="Video Thumbnail" className='w-full' />
                        ) : (
                            <Skeleton variant="rectangular" width={350} height={175} />
                        )}
                        {
                            !isLoading && (
                                <>
                                    <div className='absolute right-2 bottom-2 bg-black text-white rounded px-1'>
                                        {videoDetails.duration ? videoDetails.duration.join(':') : '0:00'}
                                    </div>
                                    <div className='absolute left-0 bottom-0 w-full'>
                                        <LinearProgress variant="determinate" value={progressPercent} color='secondary' />
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <h2 className={`text-lg p-2.5 ${theme.palette.mode === 'dark' ? 'text-white' : 'text-black'}`}>
                        {!isLoading ? videoDetails.title : <Skeleton variant="text" width={150} height={25} />}
                    </h2>

                    <div className='flex items-center gap-2 px-2.5 pb-2.5'>
                        {!isLoading ? (isChannelImage && (
                            <img src={videoDetails.profilePictureUrl} alt="Uploader Profile" className='w-12 h-12 rounded-full mr-2' />)) : (
                            <Skeleton variant="circular" width={50} height={50} />
                        )}
                        <div className='flex flex-col items-start'>
                            <p className={`text-sm ${theme.palette.mode === 'dark' ? 'text-white' : 'text-black'}`}>
                                {!isLoading ? videoDetails.uploader : <Skeleton variant="text" width={100} height={18} />}
                            </p>
                            <p className={`text-sm ${theme.palette.mode === 'dark' ? 'text-white' : 'text-black'}`}>
                                {!isLoading ? displayText : <Skeleton variant="text" width={100} height={18} />}
                            </p>
                        </div>
                    </div>
                </div>

                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                >
                    <Button variant='outlined' onClick={downloadImageDiv} startIcon={isValidDownload ? <CheckCircleIcon /> : isDownloading ? <HourglassBottomIcon /> : <DownloadIcon />}>Télécharger</Button>
                    <FilledButton onClick={copyImageDiv} startIcon={isValidCopy ? <CheckCircleIcon /> : isCopying ? <HourglassBottomIcon /> : <ContentCopyIcon />} >Copier</FilledButton>
                </ButtonGroup>
            </div>
    );
}

export default Thumbnail;
