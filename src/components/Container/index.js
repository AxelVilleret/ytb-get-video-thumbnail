import React, { useEffect, useState } from 'react';
import Thumbnail from '../Thumbnail';
import Form from '../Form';

function Container() {

  console.log('Container rendered');
  const [videoId, setVideoId] = useState('f7_CHu0ADhM');
  const [progressPercent, setProgressPercent] = useState(50);
  const [isChannelImage, setIsChannelImage] = useState(true);  

  return (
    <div className="flex flex-col gap-5 justify-center shadow-md rounded p-5 bg-white h-1/3">
      <h1 className='text-xl'>Récupérez votre miniature YouTube au format PNG !</h1>
      <div className='flex justify-center gap-5 flex-col md:flex-row'>
        <Form onSearch={setVideoId} onSliderChange={setProgressPercent} onSwitchChange={setIsChannelImage} progressPercent={progressPercent} />
        <Thumbnail videoId={videoId} progressPercent={progressPercent} isChannelImage={isChannelImage} />
      </div>
    </div>
  );
}

export default Container;
