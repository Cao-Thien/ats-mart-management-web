import { ComponentOverrideThemeParams, ThemeComponents } from '../themeConstants';
import { paletteNames } from '../themePalettes';
import { CSSObject } from '@mui/system';
import { capitalize } from 'utils/muiStyle';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    extraLarge: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    extraSmall: true;
    extraLarge: true;
  }
}

const overrideButton = (theme: ComponentOverrideThemeParams): Pick<ThemeComponents, 'MuiButton' | 'MuiIconButton'> => ({
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },

    styleOverrides: {
      root: {
        fontWeight: 500,
        '&.MuiButton-sizeExtraLarge': {
          fontSize: 18,
        },

        '&.MuiButton-outlined': {
          border: `1px solid ${theme.palette.background.outline}`,
          color: theme.palette.text.onBackground,
        },
      },

      sizeLarge: {
        fontSize: 16,
      },
      sizeMedium: {
        fontSize: 14,
      },
      sizeSmall: {
        fontSize: 12,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '&.MuiIconButton-sizeExtraSmall': {
          width: 24,
          height: 24,
        },
        '&.MuiIconButton-sizeSmall': {
          width: 32,
          height: 32,
        },
        '&.MuiIconButton-sizeMedium': {
          width: 40,
          height: 40,
        },
        '&.MuiIconButton-sizeLarge': {
          width: 48,
          height: 48,
        },
        '&.MuiIconButton-sizeExtraLarge': {
          width: 56,
          height: 56,
        },
        ...paletteNames.reduce(
          (final, name) => {
            final[`&.IconButton-contained.MuiIconButton-color${capitalize(name)}`] = {
              color: theme.palette[name]?.contrastText || theme.palette.primary.contrastText,
              backgroundColor: theme.palette[name].main,
              '&:hover': {
                backgroundColor: theme.palette[name].main,
              },
            };

            return final;
          },
          {} as Record<string, CSSObject>
        ),
      },
    },
  },
});

export default overrideButton;
