import { useState, useEffect } from 'react';
import { localStorageService } from '../services/LocalStorageService';
import { UrlStorageService } from '../services/UrlStorageService';

export interface Settings {
    videoUrl: string;
    progressPercent: number;
    isChannelImage: boolean;
    radiusSize: string;
}

const DEFAULT_SETTINGS: Settings = {
    videoUrl: 'https://www.youtube.com/watch?v=gXtp6C-3JKo',
    progressPercent: 80,
    isChannelImage: true,
    radiusSize: '-2xl'
};

const STORAGE_KEY = 'settings';

export const useSettings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSettings, setCurrentSettings] = useState<Settings | null>(null);

    const updateSettings = (newSettings: Settings): void => {
        setCurrentSettings(newSettings);
        localStorageService.persist(STORAGE_KEY, newSettings);
        UrlStorageService.persist(newSettings);
    };

    const resetSettings = (): void => {
        updateSettings(DEFAULT_SETTINGS);
    };

    useEffect(() => {
        let settings: Settings | null = UrlStorageService.retrieve() as Settings | null;
        if (!settings) {
            settings = localStorageService.retrieve(STORAGE_KEY) as Settings | null;
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