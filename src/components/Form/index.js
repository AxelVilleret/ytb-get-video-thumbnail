import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FilledButton } from '../custom/CustomButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function Form({ onSearch, onSliderChange, onSwitchChange, progressPercent}) {

    const extractVideoId = (e) => {
        console.log(e.target.value);
        const url = e.target.value;
        const videoId = url.split('v=')[1] ? url.split('v=')[1].split('&')[0] : 'not found';
        onSearch(videoId);
    }

    const handleSliderChange = (e) => {
        onSliderChange(e.target.value);
    }

    const handleSwitchChange = (e) => {
        onSwitchChange(e.target.checked);
    }


    return (
        <div className='flex flex-col justify-center gap-2'>

            <TextField id="outlined-basic" label="URL de la vidéo" variant="outlined" onChange={extractVideoId} />
            <div className='text-left'>
                <Typography id="progress-slider" gutterBottom>
                    Avancement de la vidéo
                </Typography>
                <Slider
                    aria-labelledby="progress-slider"
                    value={progressPercent}
                    onChange={handleSliderChange}
                />
                <FormControlLabel control={<Switch defaultChecked onChange={handleSwitchChange} />} label="Image de la chaine" />
            </div>

            <div className='flex flex-col justify-center items-center'>
                <FilledButton variant="contained" className='gradientButton'>Réinitialiser</FilledButton>
            </div>
            


        </div>
    );
}

export default Form;