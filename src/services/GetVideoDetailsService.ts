import { makePostRequest } from "../utils/requests";

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface VideoDetails {
    snippet: {
        thumbnails: {
            maxres: {
                url: string;
            };
        };
        title: string;
        channelTitle: string;
        channelId: string;
        publishedAt: string;
    };
    contentDetails: {
        duration: string;
    };
    statistics: {
        viewCount: string;
    };
}

interface ChannelDetails {
    snippet: {
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

export interface VideoInfo {
    thumbnailUrl: string;
    title: string;
    uploader: string;
    profilePictureUrl: string;
    duration: number[];
    views: number;
    daysSincePublished: number;
}

async function getVideoDetails(videoId: string): Promise<VideoInfo> {
    if (videoId === 'not found') throw new Error('Invalid video URL');

    const videoDetails = await fetchVideoDetails(videoId);
    const channelDetails = await fetchChannelDetails(videoDetails.snippet.channelId);

    const videoInfo = formatVideoDetails(videoDetails, channelDetails);
    return videoInfo;
}

async function fetchVideoDetails(videoId: string): Promise<VideoDetails> {
    await wait(3000);
    const url = `/.netlify/functions/fetchVideoDetails`;
    const data = await makePostRequest(url, { videoId });

    return data as VideoDetails;
}

async function fetchChannelDetails(channelId: string): Promise<ChannelDetails> {
    const url = `/.netlify/functions/fetchChannelDetails`;
    const data = await makePostRequest(url, { channelId });

    return data as ChannelDetails;
}


function formatVideoDetails(videoDetails: VideoDetails, channelDetails: ChannelDetails): VideoInfo {
    const thumbnailUrl = videoDetails.snippet.thumbnails.maxres.url;
    const title = videoDetails.snippet.title;
    const uploader = videoDetails.snippet.channelTitle;
    const profilePictureUrl = channelDetails.snippet.thumbnails.default.url;
    const publishedAt = new Date(videoDetails.snippet.publishedAt);
    const daysSincePublished = Math.floor((new Date().getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));
    const views = parseInt(videoDetails.statistics.viewCount);
    const duration = formatDuration(videoDetails.contentDetails.duration);

    return {
        thumbnailUrl,
        title,
        uploader,
        profilePictureUrl,
        duration,
        views,
        daysSincePublished
    };
}

function formatDuration(duration: string): number[] {
    const time = [0, 0, 0];

    const hours = duration.match(/(\d+)(?=[H])/gi);
    const minutes = duration.match(/(\d+)(?=[M])/gi);
    const seconds = duration.match(/(\d+)(?=[S])/gi);

    if (hours) time[0] = parseInt(hours[0]);
    if (minutes) time[1] = parseInt(minutes[0]);
    if (seconds) time[2] = parseInt(seconds[0]);

    let foundNonZero = false;
    return time.filter((value) => {
        if (value !== 0) foundNonZero = true;
        return foundNonZero;
    });
}

export { getVideoDetails };
