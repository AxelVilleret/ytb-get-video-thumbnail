import React, { useContext } from 'react';
import Thumbnail from '../Thumbnail';
import Form from '../Form';
import MaterialUISwitch from '../custom/CustomSwitch';
import { CircularProgress } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useSettings } from '../../hooks/useSettings';
import { ThemeContext } from '../../App';

const Container: React.FC = () => {

  const { isLoading, currentSettings, updateSettings, resetSettings } = useSettings();
  const { darkThemeActive, toggleTheme } = useContext(ThemeContext);

  return (
    isLoading ? <CircularProgress color="inherit" /> :
      <div className={`flex flex-col gap-5 justify-center shadow-md rounded-2xl p-5 ${darkThemeActive ? 'bg-gray-800 text-white' : 'bg-white text-black'} w-96 md:w-auto`}>
        <div className='flex justify-center items-center gap-5'>
          <h1 className='text-xl'>Récupérez votre miniature YouTube au format PNG !</h1>
          <MaterialUISwitch checked={darkThemeActive} onChange={toggleTheme} />
        </div>
        <Divider />
        <div className='flex justify-center gap-5 flex-col md:flex-row'>
          <Form settings={currentSettings!} onSettingsChange={updateSettings} onReset={resetSettings} />
          <Thumbnail settings={currentSettings!} />
        </div>
      </div>
  );
}

export default Container;
