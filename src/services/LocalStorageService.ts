interface LocalStorageService {
    persist: (key: string, value: any) => void;
    retrieve: (key: string) => any | null;
    remove: (key: string) => void;
}

export const localStorageService: LocalStorageService = {
    persist: (key: string, value: any): void => {
        if (!key || value === undefined) {
            return;
        }

        try {
            const valueToStore = JSON.stringify(value);
            localStorage.setItem(key, valueToStore);
        } catch (error) {
            console.error(`Erreur lors de l'enregistrement dans le localStorage : ${error}`);
        }
    },

    retrieve: (key: string): any | null => {
        if (!key) {
            return null;
        }

        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Erreur lors de la récupération du localStorage : ${error}`);
            return null;
        }
    },

    remove: (key: string): void => {
        if (!key) {
            return;
        }

        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Erreur lors de la suppression du localStorage : ${error}`);
        }
    }
};
