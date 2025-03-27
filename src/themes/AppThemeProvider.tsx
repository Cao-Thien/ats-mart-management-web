import { PropsWithChildren } from 'react';

// THEME
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  Theme as MuiTheme,
  ThemeOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// i18n
import { koKR as pickersKoKR } from '@mui/x-date-pickers/locales';
import { koKR as coreKoKR } from '@mui/material/locale';

// PALETTES
import { createPaletteOptions, createPaletteGlobalCss } from 'themes/themePalettes';

// THEME OPTIONS
import { typography, TypographyOverrides } from './themeOptions/themeTypography';
import { PaperOverrides } from './themeOptions/themeElevation';
import { breakpoints, OverridesContainer } from './themeOptions/themeBreakpoints';

// COMPONENT OVERRIDES
import overrideSelect from './componentOverrides/overrideSelect';
import overrideTextField from './componentOverrides/overrideTextField';
import overrideCard from './componentOverrides/overrideCard';
import overrideButton from './componentOverrides/overrideButton';
import overrideDrawer from './componentOverrides/overrideDrawer';

// GLOBAL STYLES
import { createGlobalStyles } from './globalStyles';

// CONSTANTS
import { ThemeName, ThemeComponents } from './themeConstants';

// Make @emotion/styled recognize the MUI theme
// TS will always complain without this declare
declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

const mergeComponentOverrides = (...componentsArgs: ThemeComponents[]): ThemeComponents => {
  const finalComponents: ThemeComponents = {};

  componentsArgs.forEach(componentMap => {
    const existedComponents = Object.keys(componentMap).filter(
      key => !!finalComponents[key as keyof typeof finalComponents]
    );

    // todo: merge is hard, need to check, throw error for now
    if (existedComponents.length > 0) {
      throw new Error(`Cannot merge component overrides: "${existedComponents.join('", "')}" already exists.`);
    }

    Object.assign(finalComponents, componentMap);
  });

  return finalComponents;
};

const createAppTheme = (themeName: ThemeName) => {
  const themeOptions: ThemeOptions = {
    palette: createPaletteOptions(themeName),
    shape: { borderRadius: 8 },
    typography,
    breakpoints,
  };

  // First create a pure theme to pass to override component functions
  const preCreatedTheme = createTheme(themeOptions);
  delete preCreatedTheme.components;

  // Return the final theme
  return createTheme(
    {
      ...themeOptions,
      components: mergeComponentOverrides(
        {
          MuiTypography: TypographyOverrides,
          MuiPaper: PaperOverrides,
          MuiContainer: OverridesContainer,
          MuiCssBaseline: {
            styleOverrides: createGlobalStyles([createPaletteGlobalCss(preCreatedTheme.palette)]),
          },
        },
        overrideButton(preCreatedTheme),
        overrideCard(preCreatedTheme),
        overrideSelect(preCreatedTheme),
        overrideTextField(preCreatedTheme),
        overrideDrawer()
      ),
    },
    ...[pickersKoKR, coreKoKR]
  );
};

const theme = createAppTheme('light');
// console.info('[Material Theme]', theme);

const AppThemeProvider = ({ children }: PropsWithChildren) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  </StyledEngineProvider>
);

export default AppThemeProvider;
