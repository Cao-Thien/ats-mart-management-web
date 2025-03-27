import { ThemeName } from 'themes/themeConstants';
import { PaletteOptions } from '@mui/material/styles';
import lightPalette from './lightPalette';
import { mapKeysToArray, PaletteName, makePaletteGlobalCssCreator } from 'utils/muiStyle';

declare module '@mui/material/styles' {
  // interface Palette {
  //   inverse: Palette['primary'];
  // }
  //
  // interface PaletteOptions {
  //   inverse?: PaletteOptions['primary'];
  // }

  interface TypeBackground {
    inverse: string;
    surface: string;
    outline: string;
    outlineVariant: string;
  }

  interface TypeText {
    onInverse: string;
    onBackground: string;
    info: string;
  }
}

// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     inverse: true;
//   }
// }
//
// declare module '@mui/material/IconButton' {
//   interface IconButtonPropsColorOverrides {
//     inverse: true;
//   }
// }

// todo: make sure no missing customized values
//   Solution 1: make one theme as main theme and other to merge to main theme
//   Solution 2: make one theme as main theme and check missing keys for other themes
export const createPaletteOptions = (themeName: ThemeName) =>
  themeName == 'light'
    ? lightPalette
    : ({
        mode: 'dark',
      } as PaletteOptions);

export const paletteNames = mapKeysToArray<PaletteName>({
  primary: true,
  secondary: true,
  error: true,
  warning: true,
  info: true,
  success: true,
});

// Create global css for all palettes, color names are defined in above "paletteColors"
//
// Classes are defined in srs/utils/muiStyle/colorUtils.ts
// todo: write classes in docs
export const createPaletteGlobalCss = makePaletteGlobalCssCreator(paletteNames);
