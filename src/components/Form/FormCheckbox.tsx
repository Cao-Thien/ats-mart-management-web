// COMPONENTS

import { Controller, Control } from 'react-hook-form';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

export type FormCheckboxProps = CheckboxProps & {
  control?: Control;
};

const FormCheckbox = ({ hidden, name, ...restProps }: FormCheckboxProps) => {
  if (hidden) return null;

  return (
    <Controller
      name={name!}
      render={({ field }) => <Checkbox defaultChecked={field.value} {...field} />}
      {...restProps}
    />
  );
};

export default FormCheckbox;
