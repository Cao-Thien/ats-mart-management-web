'use client';

import { forwardRef } from 'react';
import styled from '@emotion/styled';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type AtsTextFieldProps = TextFieldProps;

const AtsTextField = forwardRef<HTMLInputElement, AtsTextFieldProps>((props, ref) => {
  return <InputStyled {...props} inputRef={ref} />;
});

AtsTextField.displayName = 'AtsTextField';

export default AtsTextField;

const InputStyled = styled(TextField)(() => ({
  '& .MuiInputBase-input': {
    borderColor: '#E0E2EC',
    fontSize: '14px',
    width: '100%',
  },
}));
