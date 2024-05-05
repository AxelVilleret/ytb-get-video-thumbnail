import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FilledButton } from '../custom/CustomButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MaterialUISwitch from '../custom/CustomSwitch';
import { useTheme } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import { localStorageService } from '../../services/LocalStorageService';


function Form({ onSearch, onSliderChange, onSwitchChange, onDiscretSliderChange, settings, setCurrentSettings, resetSettings}) {

    const theme = useTheme();

    let numberToSize = new Map([[10, '-none'], [20, ''], [30, '-2xl']]);

    const extractVideoId = (e) => {
        console.log(e.target.value);
        const url = e.target.value;
        const videoId = url.split('v=')[1] ? url.split('v=')[1].split('&')[0] : 'not found';
        onSearch(videoId);
        localStorageService.setItem('settings', { ...settings, videoId });
        setCurrentSettings({ ...settings, videoId });
    }

    const handleSliderChange = (e) => {
        onSliderChange(e.target.value);
        localStorageService.setItem('settings', { ...settings, progressPercent: e.target.value });
        setCurrentSettings({ ...settings, progressPercent: e.target.value });
    }

    const handleSwitchChange = (e) => {
        onSwitchChange(e.target.checked);
        localStorageService.setItem('settings', { ...settings, isChannelImage: e.target.checked });
        setCurrentSettings({ ...settings, isChannelImage: e.target.checked });
    }

    const handleDiscretSliderChange = (e) => {
        const strValue = numberToSize.get(e.target.value);
        onDiscretSliderChange(strValue);
        localStorageService.setItem('settings', { ...settings, radiusSize: strValue });
        setCurrentSettings({ ...settings, radiusSize: strValue });
    }


    return (
        <div className='flex flex-col gap-5 justify-center gap-2'>

            <TextField label="URL de la vidéo" variant="outlined" onChange={extractVideoId} value={`https://www.youtube.com/watch?v=${settings.videoId}`}/>
            <div className='text-left'>
                <Typography id="progress-slider" gutterBottom>
                    Avancement de la vidéo
                </Typography>
                <Slider
                    aria-labelledby="progress-slider"
                    value={settings.progressPercent}
                    onChange={handleSliderChange}
                />
                <Typography id="discret-slider" gutterBottom>
                    Coins de la miniature
                </Typography>
                <Slider aria-labelledby="discret-slider" value={[...numberToSize.entries()].find(([k, v]) => v === settings.radiusSize)?.[0]} step={10} marks min={10} max={30} onChange={handleDiscretSliderChange}/>
                <FormControlLabel control={<Switch checked={settings.isChannelImage} onChange={handleSwitchChange} />} label="Image de la chaine" />
                
            </div>

            <div className='flex flex-col justify-center items-center'>
                <FilledButton startIcon={<RefreshIcon/>} variant="contained" className='gradientButton' onClick={() => {resetSettings();}}>Réinitialiser</FilledButton>
            </div>
        </div>
    );
}

export default Form;