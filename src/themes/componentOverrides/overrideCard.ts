import { ComponentOverrideThemeParams, ThemeComponents } from '../themeConstants';

// declare module '@mui/material/Card' {}

const overrideCard = (theme: ComponentOverrideThemeParams): Pick<ThemeComponents, 'MuiCard'> => ({
  MuiCard: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: {
        paddingTop: theme.spacing(7.5),
        paddingBottom: theme.spacing(7.5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        border: 'none',
        borderRadius: 'unset',
      },
    },
  },
});

export default overrideCard;
