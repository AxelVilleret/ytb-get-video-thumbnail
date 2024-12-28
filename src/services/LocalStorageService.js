export const localStorageService = {
    persist: (key, value) => {
        if (!key || !value) {
            return;
        }

        try {
            const valueToStore = JSON.stringify(value);
            localStorage.setItem(key, valueToStore);
        } catch (error) {
            console.error(`Erreur lors de l'enregistrement dans le localStorage : ${error}`);
        }
    },

    retrieve: (key) => {
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

    remove: (key) => {
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
