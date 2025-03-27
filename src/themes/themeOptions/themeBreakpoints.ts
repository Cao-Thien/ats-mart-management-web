import { ThemeOptions } from '@mui/material/styles';
import { ThemeComponents } from 'themes/themeConstants';

// PureCSS has seven default breakpoints
// xs	  | none                                  | < 568px
// sm   | @media screen and (min-width: 35.5em) | ≥ 568px
// md   | @media screen and (min-width: 48em)   | ≥ 768px
// lg   | @media screen and (min-width: 64em)   | ≥ 1024px
// xl   | @media screen and (min-width: 80em)   | ≥ 1280px
// xxl  | @media screen and (min-width: 120em)  | ≥ 1920px
// xxxl | @media screen and (min-width: 160em)  | ≥ 2560px
// x4k  | @media screen and (min-width: 240em)  | ≥ 3840px

export const breakpoints: ThemeOptions['breakpoints'] = {
  values: {
    xs: 0, // mobile
    sm: 768, // tablet
    md: 1280, // laptop
    lg: 1920, // desktop
    xl: 2560, // large screen desktop
  },
};

export const OverridesContainer: ThemeComponents['MuiContainer'] = {
  defaultProps: {
    maxWidth: 'md',
  },
};

// vi ~/.ssh/id_rsa.pub
