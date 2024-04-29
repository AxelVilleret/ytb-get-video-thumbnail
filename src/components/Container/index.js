import React, { useEffect, useState } from 'react';
import Thumbnail from '../Thumbnail';
import Form from '../Form';

function Container() {

  return (
    <div className="flex flex-col gap-5 justify-center shadow-md rounded p-5 bg-white h-1/3">
      <h1 className='text-xl'>Récupérez votre miniature YouTube au format PNG !</h1>
      <div className='flex justify-center gap-5 flex-col md:flex-row'>
        <Form />
        <Thumbnail />
      </div>
    </div>
  );
}

export default Container;
