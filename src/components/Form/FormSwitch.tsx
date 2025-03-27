// COMPONENTS

import { Controller, Control } from 'react-hook-form';
import Switch, { SwitchProps } from '@mui/material/Switch';

export type FormSwitchProps = SwitchProps & {
  control?: Control;
};

const FormSwitch = ({ hidden, name, ...restProps }: FormSwitchProps) => {
  if (hidden) return null;

  return (
    <Controller
      name={name!}
      render={({ field }) => <Switch defaultChecked={field.value} {...field} />}
      {...restProps}
    />
  );
};

export default FormSwitch;
