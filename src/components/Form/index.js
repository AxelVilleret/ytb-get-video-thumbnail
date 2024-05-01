import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { FilledButton } from '../custom/CustomButton';

function Form() {

    return (
        <div className='flex flex-col justify-center md:w-1/2 gap-2'>

            <TextField id="outlined-basic" label="URL de la vidéo" variant="outlined" />

            <div className='flex flex-col justify-center items-center'>
                <FilledButton variant="contained" className='w-1/2 gradientButton' endIcon={<SearchIcon />}>Rechercher
                </FilledButton>
            </div>
            


        </div>
    );
}

export default Form;