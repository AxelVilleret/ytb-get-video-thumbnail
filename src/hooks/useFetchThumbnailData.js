import { useCallback, useEffect, useState } from "react";
import { getVideoDetails } from "../services/GetVideoDetailsService";
import { debounce } from "lodash";

let currentVideoId = '';

function extractVideoId(videoUrl) {
    return videoUrl.split('v=')[1] ? videoUrl.split('v=')[1].split('&')[0] : 'not found';
}

export const useFetchThumbnailData = (videoUrl) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [videoDetails, setVideoDetails] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getDetails = useCallback(debounce(async () => {
        try {
            setIsLoading(true);
            const details = await getVideoDetails(currentVideoId);
            setVideoDetails(details);
            setError(null);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }, 1000), []);

    useEffect(() => {

        if (extractVideoId(videoUrl) !== currentVideoId) {
            currentVideoId = extractVideoId(videoUrl);
            getDetails();
        }
    }, [videoUrl, getDetails]);

    return { videoDetails, error, isLoading };
};