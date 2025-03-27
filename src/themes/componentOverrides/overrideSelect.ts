import { ThemeOptions, Components } from '@mui/material/styles';
import { ComponentOverrideThemeParams } from '../themeConstants';

declare module '@mui/material/Select' {}

const overrideSelect = (_: ComponentOverrideThemeParams): Pick<Components<ThemeOptions>, 'MuiSelect'> => ({
  // Select root overrides
  MuiSelect: {
    defaultProps: {
      variant: 'standard',
    },
    styleOverrides: {
      root: {
        ['& .MuiIconButton-edgeEnd']: {
          top: 0,
        },
      },
    },
  },
});

export default overrideSelect;
