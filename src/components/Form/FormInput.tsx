// COMPONENTS

'use client';
import { Controller, Control } from 'react-hook-form';
import AtsTextField, { AtsTextFieldProps } from '../AtsTextField';

export type FormInputProps = AtsTextFieldProps & {
  control?: Control;
};

const FormInput = ({ hidden, name, focused, multiline, InputProps, ...restProps }: FormInputProps) => {
  if (hidden) return null;

  return (
    <Controller
      name={name!}
      render={({ field }) => (
        <AtsTextField
          focused={focused}
          multiline={multiline}
          fullWidth
          InputProps={InputProps}
          {...field}
          value={field.value ?? ''}
        />
      )}
      {...restProps}
    />
  );
};

export default FormInput;
