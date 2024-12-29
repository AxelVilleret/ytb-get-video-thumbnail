import qs from 'qs';

interface Configuration {
    [key: string]: any;
}

const convertValues = (settings: Configuration): Configuration => {
    const convertedSettings = { ...settings };

    Object.keys(convertedSettings).forEach(key => {
        if (convertedSettings[key] === 'true') {
            convertedSettings[key] = true;
        } else if (convertedSettings[key] === 'false') {
            convertedSettings[key] = false;
        }
    });

    return convertedSettings;
};

export const UrlStorageService = {
    persist: (value: Configuration): void => {
        const queryString = qs.stringify(value);
        const newUrl = `${window.location.pathname}?${queryString}`;
        window.history.replaceState(null, '', newUrl);
    },

    retrieve: (): Configuration | null => {
        const queryString = window.location.search.slice(1);
        const parsedSettings = qs.parse(queryString) as Configuration;
        if (Object.keys(parsedSettings).length === 0) {
            return null;
        }
        return convertValues(parsedSettings);
    },
};
