async function getThumbnailUrl(videoId) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    const response = await fetch(url);
    const data = await response.json();
    const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
    return thumbnailUrl;
}
