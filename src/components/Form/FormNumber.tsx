// COMPONENTS
import NumberField, { NumberFieldProps } from '../atoms/NumberInput/NumberField';
import { Control, Controller } from 'react-hook-form';

export type FormNumberProps = NumberFieldProps & {
  control?: Control;
};

const FormNumber = ({ hidden, name, ...restProps }: FormNumberProps) => {
  if (hidden) return null;

  return <Controller name={name!} render={({ field }) => <NumberField {...field} />} {...restProps} />;
};

export default FormNumber;
