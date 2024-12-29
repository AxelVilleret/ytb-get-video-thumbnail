import { useCallback, useEffect, useState } from "react";
import { getVideoDetails, VideoInfo } from "../services/GetVideoDetailsService";
import { debounce } from "lodash";

let currentVideoId = '';

function extractVideoId(videoUrl: string | null): string {
    return videoUrl?.split('v=')[1] ? videoUrl.split('v=')[1].split('&')[0] : 'not found';
}

export const useFetchThumbnailData = (videoUrl: string) => {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [videoDetails, setVideoDetails] = useState<VideoInfo | null>(null);

    const getDetails = useCallback(debounce(async () => {
        try {
            setIsLoading(true);
            const details = await getVideoDetails(currentVideoId);
            setVideoDetails(details);
            setError(null);
        } catch (error) {
            setError(error as Error);
        }
        setIsLoading(false);
    }, 1000) as () => void, []);

    useEffect(() => {
        if (extractVideoId(videoUrl) !== currentVideoId) {
            currentVideoId = extractVideoId(videoUrl);
            getDetails();
        }
    }, [videoUrl, getDetails]);

    return { videoDetails, error, isLoading };
};
