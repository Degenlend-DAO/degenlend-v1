import { PaletteMode, createTheme } from "@mui/material";
import React from "react";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
        const savedMode = localStorage.getItem('themeMode');
        return (savedMode as 'light' | 'dark') || 'light';
    });

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light'
                    localStorage.setItem('themeMode', newMode);
                    return newMode;
                });
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    return [theme, colorMode] as const;
};