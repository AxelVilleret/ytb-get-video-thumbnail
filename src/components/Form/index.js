import React from 'react';
import TextField from '@mui/material/TextField';
import { FilledButton } from '../custom/CustomButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import RefreshIcon from '@mui/icons-material/Refresh';

function Form({ settings, onSettingsChange, onReset }) {

    let numberToSize = new Map([[10, '-none'], [20, ''], [30, '-2xl']]);

    const handleVideoUrlChange = (e) => {
        onSettingsChange({ ...settings, videoUrl: e.target.value });
    }

    const handleSliderChange = (e) => {
        onSettingsChange({ ...settings, progressPercent: e.target.value });
    }

    const handleSwitchChange = (e) => {
        onSettingsChange({ ...settings, isChannelImage: e.target.checked });
    }

    const handleDiscretSliderChange = (e) => {
        onSettingsChange({ ...settings, radiusSize: numberToSize.get(e.target.value) });
    }


    return (
        <div className='flex flex-col gap-5 justify-center md:w-80'>
            <TextField label="URL de la vidéo" variant="outlined" onChange={handleVideoUrlChange} value={settings.videoUrl}/>
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
                <FilledButton startIcon={<RefreshIcon/>} variant="contained" className='gradientButton' onClick={onReset}>Réinitialiser</FilledButton>
            </div>
        </div>
    );
}

export default Form;