export const localStorageService = {
    persist: (key: string, value: unknown): void => {
        if (!key || value === undefined) {
            return;
        }

        const valueToStore = JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    },

    retrieve: <T>(key: string): T | null => {
        if (!key) {
            return null;
        }

        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) as T : null;
    },
};
