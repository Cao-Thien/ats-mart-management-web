// COMPONENTS

import { Controller, Control } from 'react-hook-form';
import AtsSelect, { AtsSelectProps } from '../AtsSelect';

export type FormSelectProps = AtsSelectProps & {
  control?: Control;
};

const FormSelect = ({ hidden, name, focused = false, multiline, data, label, ...restProps }: FormSelectProps) => {
  if (hidden) return null;

  return (
    <Controller
      name={name!}
      render={({ field }) => {
        return (
          <AtsSelect
            disabled={false}
            data={data}
            focused={focused}
            multiline={multiline}
            label={label}
            fullWidth
            {...field}
          />
        );
      }}
      {...restProps}
    />
  );
};

export default FormSelect;
