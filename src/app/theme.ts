'use client';

import { createTheme } from '@mui/material';
import { koKR as pickersKoKR } from '@mui/x-date-pickers/locales';
import { koKR as dataGridKoKR } from '@mui/x-data-grid/locales';
import { koKR as coreKoKR } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      background: {
        default: '#F3F4FB',
      },
      primary: {
        main: '#1853A4',
      },
      secondary: {
        main: '#fff',
        contrastText: '#74777F',
      },
    },
    // @ts-nocheck
    // @ts-ignore
    typography: {
      fontFamily: 'Pretendard, sans-serif',
      h5: {
        fontWeight: 700,
      },
      subtitle1: {
        fontWeight: 600,
      },
    },
    shape: { borderRadius: 4 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  },
  dataGridKoKR, // x-data-grid translations
  pickersKoKR, // x-date-pickers translations
  coreKoKR, // material translations
  {
    components: {
      MuiPickersCalendarHeader: {
        defaultProps: {
          format: 'YYYY M월',
        },
      },
    },
  }
);

export default theme;
