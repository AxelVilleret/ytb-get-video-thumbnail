import { useState, useEffect } from 'react';
import { localStorageService } from '../services/LocalStorageService';
import { UrlStorageService } from '../services/UrlStorageService';

const DEFAULT_SETTINGS = {
    videoUrl: 'https://www.youtube.com/watch?v=gXtp6C-3JKo',
    progressPercent: 80,
    isChannelImage: true,
    radiusSize: '-2xl'
};

const STORAGE_KEY = 'settings';

export const useSettings = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [currentSettings, setCurrentSettings] = useState(null);

    const updateSettings = (newSettings) => {
        setCurrentSettings(newSettings);
        localStorageService.persist(STORAGE_KEY, newSettings);
        UrlStorageService.persist(newSettings);
    };

    const resetSettings = () => {
        updateSettings(DEFAULT_SETTINGS);
    };

    useEffect(() => {
        let settings = UrlStorageService.retrieve();
        if (!settings) {
            settings = localStorageService.retrieve(STORAGE_KEY);
        }
        if (!settings) {
            settings = DEFAULT_SETTINGS;
        }
        updateSettings(settings);
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return {
        isLoading,
        currentSettings,
        updateSettings,
        resetSettings,
    };
};