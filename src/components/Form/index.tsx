import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { FilledButton } from '../custom/CustomButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Settings } from '../../hooks/useSettings';

interface FormProps {
    settings: Settings;
    onSettingsChange: (settings: Settings) => void;
    onReset: () => void;
}

const numberToSize = new Map<number, string>([[10, '-none'], [20, ''], [30, '-2xl']]);

const Form: React.FC<FormProps> = ({ settings, onSettingsChange, onReset }) => {

    const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ ...settings, videoUrl: e.target.value });
    }

    const handleSliderChange = (e: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            onSettingsChange({ ...settings, progressPercent: value });
        }
    }

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ ...settings, isChannelImage: e.target.checked });
    }

    const handleDiscretSliderChange = (e: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            onSettingsChange({ ...settings, radiusSize: numberToSize.get(value) ?? '' });
        }
    }

    return (
        <div className='flex flex-col gap-5 justify-center md:w-80'>
            <TextField label="URL de la vidéo" variant="outlined" onChange={handleVideoUrlChange} value={settings.videoUrl} />
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
                <Slider
                    aria-labelledby="discret-slider"
                    value={[...numberToSize.entries()].find(([, v]) => v === settings.radiusSize)?.[0] || 20}
                    step={10}
                    marks
                    min={10}
                    max={30}
                    onChange={handleDiscretSliderChange}
                />
                <FormControlLabel
                    control={<Switch checked={settings.isChannelImage} onChange={handleSwitchChange} />}
                    label="Image de la chaine"
                />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <FilledButton startIcon={<RefreshIcon />} variant="contained" className='gradientButton' onClick={onReset}>
                    Réinitialiser
                </FilledButton>
            </div>
        </div>
    );
}

export default Form;
