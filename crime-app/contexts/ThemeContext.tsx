import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
    contextTheme: string;
    changeTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    contextTheme: 'White', // Default theme name
    changeTheme: (theme: string) => { console.log('Default changeTheme function'); }
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [contextTheme, setContextTheme] = useState<string>('White');

    const changeTheme = (theme: string) => {
        console.log("Changing theme to: ", theme);
        setContextTheme(theme);
    }

    return (
        <ThemeContext.Provider value={{ contextTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    
    console.log("useTheme context: ", context);

    return context;
};

export { ThemeProvider, useTheme };