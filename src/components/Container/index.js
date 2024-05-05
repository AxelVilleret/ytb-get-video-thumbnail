import React, { useEffect, useState, } from 'react';
import Thumbnail from '../Thumbnail';
import Form from '../Form';
import { useTheme } from '@mui/material/styles';
import MaterialUISwitch from '../custom/CustomSwitch';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { localStorageService } from '../../services/LocalStorageService';
import { CircularProgress } from '@mui/material';

function Container() {

  const [isLoading, setIsLoading] = useState(true);

  const defaultSettings = {
    videoId: 'f7_CHu0ADhM',
    progressPercent: 80,
    isChannelImage: true,
    radiusSize: '-2xl'
  }

  const theme = useTheme();

  const toggleTheme = useContext(ThemeContext);

  const [videoId, setVideoId] = useState(defaultSettings.videoId);
  const [progressPercent, setProgressPercent] = useState(defaultSettings.progressPercent);
  const [isChannelImage, setIsChannelImage] = useState(defaultSettings.isChannelImage);
  const [radiusSize, setRadiusSize] = useState(defaultSettings.radiusSize);
  const [currentSettings, setCurrentSettings] = useState(defaultSettings);

  const resetSettings = () => {
    setVideoId(defaultSettings.videoId);
    setProgressPercent(defaultSettings.progressPercent);
    setIsChannelImage(defaultSettings.isChannelImage);
    setRadiusSize(defaultSettings.radiusSize);
    setCurrentSettings(defaultSettings);
    localStorageService.setItem('settings', defaultSettings);
  }

  useEffect(() => {
    const settings = localStorageService.getItem('settings');
    if (settings) {
      setVideoId(settings.videoId);
      setProgressPercent(settings.progressPercent);
      setIsChannelImage(settings.isChannelImage);
      setRadiusSize(settings.radiusSize);
      setCurrentSettings(settings);
    }
    setTimeout(() =>
      setIsLoading(false), 1000);
  }
    , []);

  return (
    isLoading ? <CircularProgress color="inherit" /> :
    <div className={`flex flex-col gap-5 justify-center shadow-md rounded p-5 ${theme.palette.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} h-1/3`}>
      <div className='flex justify-center gap-5'>
      <h1 className='text-xl'>Récupérez votre miniature YouTube au format PNG !</h1>
        <MaterialUISwitch theme={theme} checked={theme.palette.mode === 'dark'} onChange={toggleTheme} />
      </div>
      <div className='flex justify-center gap-5 flex-col md:flex-row'>
        <Form onSearch={setVideoId} onSliderChange={setProgressPercent} onSwitchChange={setIsChannelImage} onDiscretSliderChange={setRadiusSize} progressPercent={progressPercent} settings={currentSettings} setCurrentSettings={setCurrentSettings} resetSettings={resetSettings} />
        <Thumbnail videoId={videoId} progressPercent={progressPercent} radiusSize={radiusSize} isChannelImage={isChannelImage} />
      </div>
    </div>
  );
}

export default Container;
