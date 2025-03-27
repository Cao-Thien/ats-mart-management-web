import { ThemeComponents } from '../themeConstants';

const overrideDrawer = (): Pick<ThemeComponents, 'MuiDrawer'> => ({
  MuiDrawer: {
    styleOverrides: {
      root: {
        ['& .MuiPaper-root']: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export default overrideDrawer;
