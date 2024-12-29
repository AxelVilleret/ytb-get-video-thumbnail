import React from 'react';

interface ThemeContextProps {
    theme?: string;
    toggleTheme?: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({});
