import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { FilledButton } from '../custom/CustomButton';

function Form({ onSearch }) {

    const extractVideoId = (e) => {
        console.log(e.target.value);
        const url = e.target.value;
        const videoId = url.split('v=')[1] ? url.split('v=')[1].split('&')[0] : 'not found';
        onSearch(videoId);
    }

    return (
        <div className='flex flex-col justify-center gap-2'>

            <TextField id="outlined-basic" label="URL de la vidéo" variant="outlined" onChange={extractVideoId}/>

            <div className='flex flex-col justify-center items-center'>
                <FilledButton variant="contained" className='gradientButton'>Réinitialiser</FilledButton>
            </div>
            


        </div>
    );
}

export default Form;