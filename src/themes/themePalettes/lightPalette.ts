import { PaletteOptions } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1853A4',
    dark: '#00397C',
    contrastText: '#FFF',
  },
  secondary: {
    main: '#E73E0C',
    contrastText: '#FFF',
  },
  background: {
    default: '#EFF0FA', // Surface Variant
    paper: '#FFFFFF', // Surface
    surface: '#F7F7F7', // Surface Alt
    inverse: '#2D3038', // Inverse Surface
    outline: '#E0E2EC', // Outline Alt
    outlineVariant: '#C4C6D0', // Outline variant
  },
  text: {
    primary: '#2D3038', // On Surface
    onInverse: '#FFFFFF', // Inverse On Surface
    onBackground: '#2D3038', // On Surface Variant
    info: '#32B5FF',
  },
  info: {
    main: '#14A6E4',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#28D396',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#DD950A',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#F32147',
    contrastText: '#FFFFFF',
  },
  divider: '#E0E2EC',
};

export default lightPalette;
