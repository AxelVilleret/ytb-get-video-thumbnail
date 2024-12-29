import React, { useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FilledButton } from '../custom/CustomButton';
import { Skeleton } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert } from '@mui/material';
import { getStatsDisplay } from '../../utils/displays';
import { useFetchThumbnailData } from '../../hooks/useFetchThumbnailData';
import useImageOperations from '../../hooks/useImageOperations';
import { Settings } from '../../hooks/useSettings';
import { ThemeContext } from '../../App';

interface ThumbnailProps {
    settings: Settings;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ settings: { videoUrl, isChannelImage, radiusSize, progressPercent } }) => {

    const { darkThemeActive } = useContext(ThemeContext);

    const { videoDetails, error, isLoading } = useFetchThumbnailData(videoUrl);

    const cardRef = useRef<HTMLDivElement>(null);

    const { isDownloading, isCopying, isValidDownload, isValidCopy, downloadImageDiv, copyImageDiv } = useImageOperations(cardRef, videoDetails);

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            {error ?
                (<Alert severity="error" variant="outlined" className='grow-0'>{error.message}</Alert>)
                :
                (
                    <>
                        <div className={`w-80 border border-gray-300 rounded${radiusSize} overflow-hidden flex flex-col items-start text-left ${darkThemeActive ? 'text-white bg-gray-800' : 'text-black bg-white'}`} ref={cardRef}>
                            <div className='relative'>
                                {!isLoading ? (
                                    <img src={videoDetails!.thumbnailUrl} alt="Video Thumbnail" className='w-full' />
                                ) : (
                                    <Skeleton variant="rectangular" width={350} height={175} />
                                )}
                                {
                                    !isLoading && (
                                        <>
                                            <div className='absolute right-2 bottom-2 bg-black text-white rounded px-1'>
                                                {videoDetails!.duration.join(':')}
                                            </div>
                                            <div className='absolute left-0 bottom-0 w-full'>
                                                <LinearProgress variant="determinate" value={progressPercent} color='secondary' />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <h2 className={`text-lg p-2.5 ${darkThemeActive ? 'text-white' : 'text-black'}`}>
                                {!isLoading ? videoDetails!.title : <Skeleton variant="text" width={150} height={25} />}
                            </h2>

                            <div className='flex items-center gap-2 px-2.5 pb-2.5'>
                                {!isLoading ? (isChannelImage && (
                                    <img src={videoDetails!.profilePictureUrl} alt="Uploader Profile" className='w-12 h-12 rounded-full mr-2' />)) : (
                                    <Skeleton variant="circular" width={50} height={50} />
                                )}
                                <div className='flex flex-col items-start'>
                                    <p className={`text-sm ${darkThemeActive ? 'text-white' : 'text-black'}`}>
                                        {!isLoading ? videoDetails!.uploader : <Skeleton variant="text" width={100} height={18} />}
                                    </p>
                                    <p className={`text-sm ${darkThemeActive ? 'text-white' : 'text-black'}`}>
                                        {!isLoading ? getStatsDisplay(videoDetails!.views, videoDetails!.daysSincePublished) : <Skeleton variant="text" width={100} height={18} />}
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
                            <FilledButton onClick={copyImageDiv} startIcon={isValidCopy ? <CheckCircleIcon /> : isCopying ? <HourglassBottomIcon /> : <ContentCopyIcon />}>Copier</FilledButton>
                        </ButtonGroup>
                    </>
                )}
        </div>
    );
}

export default Thumbnail;
