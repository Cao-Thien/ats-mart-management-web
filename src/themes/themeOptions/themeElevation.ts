import { ThemeComponents } from '../themeConstants';

export const PaperOverrides: ThemeComponents['MuiPaper'] = {
  styleOverrides: {
    // use ONLY 4 levels of elevation
    elevation1: { boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.04)' }, // default
    elevation2: { boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.12)' }, // active
    elevation3: { boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.12)' }, // block
    elevation4: { boxShadow: '0 20px 32px 0 rgba(0, 0, 0, 0.12)' }, // floating
  },
};
