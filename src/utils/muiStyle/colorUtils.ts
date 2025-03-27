import { Palette } from '@mui/material/styles';
import { capitalize } from './styleUtils';
import { Any } from 'constants/types';

export type ExtractColors<
  Props extends { color?: Any },
  ExcludeColor extends Required<Props>[ColorKey] | undefined = undefined,
  ColorKey extends keyof Props = 'color',
> = Exclude<Required<Props>[ColorKey], ExcludeColor>;

// Extract palette names from palette, including customized palette names
export type PaletteName = Exclude<
  keyof Palette,
  | 'common'
  | 'mode'
  | 'contrastThreshold'
  | 'tonalOffset'
  | 'grey'
  | 'text'
  | 'divider'
  | 'action'
  | 'background'
  | 'getContrastText'
  | 'augmentColor'
>;

// Make creator for global css for all palettes, color names are defined as PaletteName[]
//
// Classes example with primary color:
//   .TextColor-primary      : apply color for text only
//   .BgColor-primary        : apply color for background only
//   .Color-primary          : apply color for background and contrast text for text
//   .BorderColor-primary    : apply color for borders of 4 positions
//   .BorderColor-leftPrimary: apply color for left border only
export const makePaletteGlobalCssCreator = (paletteNames: PaletteName[]) => (palette: Palette) => `
  ${paletteNames.map(
    color => `
    .TextColor-${color} {
      color: ${palette[color].main};
    }
    
    .TextColor-${color}Contrast {
      color: ${palette[color].contrastText};
    }
    
    .BgColor-${color}, .Color-${color} {
      background-color: ${palette[color].main};
    }
    
    .Color-${color} {
      color: ${palette[color]?.contrastText || palette.primary.contrastText};
    }
    
    .BorderColor-${color} {
      border-color: ${palette[color].main};
    }
    
    ${['top', 'right', 'bottom', 'left'].map(
      position => `
    .BorderColor-${position}${capitalize(color)} {
      border-${position}-color: ${palette[color].main};
    }
    `
    )}
  `
  )}
  
  .TextColor-textPrimary {
    color: ${palette.text.primary};
  }
`;
