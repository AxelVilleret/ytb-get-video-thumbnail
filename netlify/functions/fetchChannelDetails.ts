import fetch from 'node-fetch';
import { Event, YouTubeResponse } from './fetchVideoDetails';

export const handler = async function (event: Event) {
    const { channelId } = JSON.parse(event.body);

    if (!channelId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid video URL' }),
        };
    }

    const apiKey = process.env.YTB_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=snippet`;
    const response = await fetch(url);

    if (!response.ok) {
        return {
            statusCode: response.status,
            body: JSON.stringify({ error: 'Erreur lors de la récupération des données !' }),
        };
    }

    const data: YouTubeResponse = await response.json() as YouTubeResponse;

    if (!data.items || data.items.length === 0) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Aucune chaîne trouvée avec cet ID !' }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data.items[0]),
    };
};
