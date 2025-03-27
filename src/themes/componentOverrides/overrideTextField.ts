import { ThemeOptions, Components } from '@mui/material/styles';
// import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { inputClasses } from '@mui/material/Input';
import { ComponentOverrideThemeParams } from '../themeConstants';

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/FormControl' {
  interface FormControlPropsSizeOverrides {
    large: true;
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    large: true;
  }
}

const overrideTextField = (
  theme: ComponentOverrideThemeParams
): Pick<
  Components<ThemeOptions>,
  'MuiTextField' | 'MuiOutlinedInput' | 'MuiFilledInput' | 'MuiInput' | 'MuiFormControl'
> => ({
  // TextField root overrides
  MuiTextField: {
    defaultProps: {
      variant: 'standard',
      size: 'small',
    },
    // styleOverrides: {
    // Example:
    // {
    //   root: {
    //     '--TextField-brandBorderColor': '#E0E3E7',
    //     '--TextField-brandBorderHoverColor': '#B2BAC2',
    //     '--TextField-brandBorderFocusedColor': '#6F7E8C',
    //     '& label.Mui-focused': {
    //       color: 'var(--TextField-brandBorderFocusedColor)',
    //     },
    //   },
    // }
    // },
  },

  // Variant "outlined" overrides
  // MuiOutlinedInput: {
  //   styleOverrides: {
  //     notchedOutline: {
  //       borderColor: 'var(--TextField-brandBorderColor)',
  //     },
  //     root: {
  //       [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
  //         borderColor: 'var(--TextField-brandBorderHoverColor)',
  //       },
  //       [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
  //         borderColor: 'var(--TextField-brandBorderFocusedColor)',
  //       },
  //     },
  //   },
  // },

  // Variant "filled" overrides
  // MuiFilledInput: {
  //   styleOverrides: {
  //     root: {
  //       '&::before, &::after': {
  //         borderBottom: '2px solid var(--TextField-brandBorderColor)',
  //       },
  //       '&:hover:not(.Mui-disabled, .Mui-error):before': {
  //         borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
  //       },
  //       '&.Mui-focused:after': {
  //         borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
  //       },
  //     },
  //   },
  // },

  // Base Input overrides. todo: separate this because it's used in other component
  MuiInput: {
    styleOverrides: {
      root: {
        height: 40, // default size is "medium"
        '&::before': {
          borderBottom: 'none',
        },
        [`&:hover:not(.${inputClasses.disabled}, .${inputClasses.error}):before`]: {
          borderBottom: 'none',
        },
        [`&.${inputClasses.focused}:after`]: {
          borderBottom: 'none',
        },
        '.MuiInputBase-inputSizeSmall': {
          height: 32,
        },
        '.MuiInputBase-inputSizeMedium': {
          height: 40,
        },
        '.MuiInputBase-inputSizeLarge': {
          height: 48,
        },
        '.MuiIconButton-edgeEnd': {
          marginRight: 0,
        },
        background: theme.palette.background.surface,
        borderRadius: 4,
        paddingLeft: 16,
      },
    },
  },

  MuiFormControl: {
    styleOverrides: {
      root: {
        '.MuiInputBase-sizeSmall, .MuiInputBase-sizeSmall.MuiInputBase-input': {
          height: 32,
        },
        '.MuiInputBase-sizeMedium, .MuiInputBase-sizeMedium.MuiInputBase-input': {
          height: 40,
        },
        '.MuiInputBase-sizeLarge, .MuiInputBase-sizeLarge.MuiInputBase-input': {
          height: 48,
        },
      },
    },
  },
});

export default overrideTextField;
