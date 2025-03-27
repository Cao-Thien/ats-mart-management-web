import { ThemeOptions, Theme } from '@mui/material/styles';

export type ThemeName = 'light' | 'dark';

export type ThemeComponents = Required<ThemeOptions>['components'];

export type ComponentOverrideThemeParams = Omit<Theme, 'components'>;
