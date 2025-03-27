import { ThemeOptions } from '@mui/material/styles';
import { ThemeComponents } from '../themeConstants';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headline1: React.CSSProperties;
    headline2: React.CSSProperties;
    headline3: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    label4: React.CSSProperties;
    small1: React.CSSProperties;
    small2: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    headline1: React.CSSProperties;
    headline2: React.CSSProperties;
    headline3: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
    label4: React.CSSProperties;
    small1: React.CSSProperties;
    small2: React.CSSProperties;
  }

  interface TypographyColor {
    info: string;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headline1: true;
    headline2: true;
    headline3: true;
    title1: true;
    title2: true;
    title3: true;
    body1: true;
    body2: true;
    body3: true;
    label1: true;
    label2: true;
    label3: true;
    label4: true;
    small1: true;
    small2: true;
  }
}

export const typography: ThemeOptions['typography'] = {
  fontFamily: [
    '"pretendard"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  headline1: { fontSize: 32, lineHeight: 40 / 32, fontWeight: 700 },
  headline2: { fontSize: 28, lineHeight: 36 / 28, fontWeight: 700 },
  headline3: { fontSize: 24, lineHeight: 32 / 24, fontWeight: 700 },
  title1: { fontSize: 20, lineHeight: 24 / 20, fontWeight: 600 },
  title2: { fontSize: 16, lineHeight: 20 / 16, fontWeight: 600 },
  title3: { fontSize: 14, lineHeight: 18 / 14, fontWeight: 600 },
  body1: { fontSize: 16, lineHeight: 24 / 16, fontWeight: 400 },
  body2: { fontSize: 14, lineHeight: 20 / 14, fontWeight: 400 },
  body3: { fontSize: 12, lineHeight: 18 / 12, fontWeight: 400 },
  label1: { fontSize: 18, lineHeight: 22 / 18, fontWeight: 500 },
  label2: { fontSize: 16, lineHeight: 20 / 16, fontWeight: 500 },
  label3: { fontSize: 14, lineHeight: 18 / 14, fontWeight: 500 },
  label4: { fontSize: 12, lineHeight: 14 / 12, fontWeight: 500 },
  small1: { fontSize: 10, lineHeight: 14 / 10, fontWeight: 500 },
  small2: { fontSize: 8, lineHeight: 10 / 8, fontWeight: 500 },
};

export const TypographyOverrides: ThemeComponents['MuiTypography'] = {
  defaultProps: {
    variantMapping: {
      headline1: 'h1',
      headline2: 'h2',
      headline3: 'h3',
      title1: 'h4',
      title2: 'h5',
      title3: 'h6',
      body1: 'div',
      body2: 'div',
      body3: 'div',
      label1: 'label',
      label2: 'label',
      label3: 'label',
      label4: 'label',
      small1: 'span',
      small2: 'span',
    },
  },
};
