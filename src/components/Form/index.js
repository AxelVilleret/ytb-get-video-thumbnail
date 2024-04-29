import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

function Form() {

    return (
        <div className='flex flex-col justify-center md:w-1/2 gap-2'>

            <TextField id="outlined-basic" label="URL de la vidéo" variant="outlined" />

            <div className='flex flex-col justify-center items-center'>
                <Button variant="contained" className='w-1/2' endIcon={<SearchIcon />}>Rechercher</Button>
            </div>
            


        </div>
    );
}

export default Form;