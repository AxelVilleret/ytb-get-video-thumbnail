import qs from 'qs';

const convertValues = (settings) => {
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
    persist: (value) => {
        const queryString = qs.stringify(value);
        const newUrl = `${window.location.pathname}?${queryString}`; window.history.replaceState(null, '', newUrl);
    },

    retrieve: () => {
        const queryString = window.location.search.slice(1);
        const parsedSettings = qs.parse(queryString); 
        return convertValues(parsedSettings);
    },
};
