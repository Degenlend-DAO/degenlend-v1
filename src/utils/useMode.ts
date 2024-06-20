import { PaletteMode, createTheme } from "@mui/material";
import React from "react";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
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