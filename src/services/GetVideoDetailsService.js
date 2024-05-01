import { useState } from 'react';

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getVideoDetails(videoId, controlLoading) {
    try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`;
        controlLoading(true);
        await wait(1000);
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error('Aucune vidéo trouvée avec cet ID !');
        }

        const videoDetails = data.items[0];

        const thumbnailUrl = videoDetails.snippet.thumbnails.maxres.url;
        const title = videoDetails.snippet.title;
        const uploader = videoDetails.snippet.channelTitle;
        const publishedAt = new Date(videoDetails.snippet.publishedAt);
        const daysSincePublished = Math.floor((new Date() - publishedAt) / (1000 * 60 * 60 * 24));

        // Convertir la durée en format ISO 8601 (PT#H#M#S) en secondes
        const duration = videoDetails.contentDetails.duration;

        // Créez un tableau avec des zéros pour les heures, les minutes et les secondes
        let time = [0, 0, 0];

        // Utilisez une expression régulière pour trouver toutes les correspondances
        let hours = duration.match(/(\d+)(?=[H])/gi);
        let minutes = duration.match(/(\d+)(?=[M])/gi);
        let seconds = duration.match(/(\d+)(?=[S])/gi);

        // Si une valeur est trouvée, remplacez la valeur par celle trouvée
        if (hours) time[0] = parseInt(hours[0]);
        if (minutes) time[1] = parseInt(minutes[0]);
        if (seconds) time[2] = parseInt(seconds[0]);

        let foundNonZero = false;
        time = time.filter((value) => {
            if (value !== 0) foundNonZero = true;
            return foundNonZero;
        });

        const views = videoDetails.statistics.viewCount;

        // Obtenir la photo de profil de l'uploader
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?id=${videoDetails.snippet.channelId}&key=${apiKey}&part=snippet`;
        const channelResponse = await fetch(channelUrl);
        const channelData = await channelResponse.json();
        const profilePictureUrl = channelData.items[0].snippet.thumbnails.default.url;

        return {
            thumbnailUrl,
            title,
            uploader,
            profilePictureUrl,
            duration: time,
            views,
            daysSincePublished
        };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error so it can be caught in the calling method
    }
}

export { getVideoDetails };
