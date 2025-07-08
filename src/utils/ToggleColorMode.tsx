import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

interface ToggleColorModeProps {
  mode: PaletteMode;
  colorMode: {
    toggleColorMode: () => void;
  };
}

const ThemeToggleButton = styled(Button)(({ theme }) => ({
  minWidth: '40px',
  height: '40px',
  borderRadius: '50%',
  padding: '8px',
  transition: 'all 0.3s ease',
  color: theme.palette.mode === 'dark' 
    ? theme.palette.warning.light 
    : theme.palette.primary.main,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 167, 38, 0.08)' 
    : 'rgba(25, 118, 210, 0.08)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 167, 38, 0.16)' 
      : 'rgba(25, 118, 210, 0.16)',
    transform: 'scale(1.1)'
  },
  '&:active': {
    transform: 'scale(0.95)'
  }
}));

function ToggleColorMode({ mode, colorMode }: ToggleColorModeProps) {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px'
    }}>
      <ThemeToggleButton
        variant="text"
        onClick={colorMode.toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </ThemeToggleButton>
    </Box>
  );
}

export default ToggleColorMode;