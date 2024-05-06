import React, { useEffect, useState, } from 'react';
import Thumbnail from '../Thumbnail';
import Form from '../Form';
import { useTheme } from '@mui/material/styles';
import MaterialUISwitch from '../custom/CustomSwitch';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { localStorageService } from '../../services/LocalStorageService';
import { CircularProgress } from '@mui/material';
import Divider from '@mui/material/Divider';

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
  const [currentSettings, setCurrentSettings] = useState(defaultSettings);

  const resetSettings = () => {
    setCurrentSettings(defaultSettings);
    localStorageService.setItem('settings', defaultSettings);
  }

  useEffect(() => {
    const settings = localStorageService.getItem('settings');
    if (settings) {
      setCurrentSettings(settings);
    }
    setTimeout(() =>
      setIsLoading(false), 1000);
  }
    , []);

  return (
    isLoading ? <CircularProgress color="inherit" /> :
    <div className={`flex flex-col gap-5 justify-center shadow-md rounded-2xl p-5 ${theme.palette.mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} w-96 md:w-auto`}>
        <div className='flex justify-center items-center gap-5'>
        <h1 className='text-xl'>Récupérez votre miniature YouTube au format PNG !</h1>
        <MaterialUISwitch theme={theme} checked={theme.palette.mode === 'dark'} onChange={toggleTheme} />
        </div>
        <Divider/>
      <div className='flex justify-center gap-5 flex-col md:flex-row'>
        <Form settings={currentSettings} onSettingsChange={setCurrentSettings} onReset={resetSettings} />
        <Thumbnail settings={currentSettings} />
      </div>
    </div>
  );
}

export default Container;
