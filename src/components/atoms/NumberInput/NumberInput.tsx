import styled from '@emotion/styled';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps as BaseNumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

declare module '@mui/base/Unstable_NumberInput' {
  interface NumberInputStepperButtonSlotPropsOverrides extends IconButtonProps {}

  interface NumberInputInputSlotPropsOverrides {
    minWidth?: number;
  }
}

export type NumberInputProps = Pick<BaseNumberInputProps, 'min' | 'max' | 'step' | 'value' | 'defaultValue'> & {
  width?: number;
  disableInput?: boolean;
  onChange?: (value: number | null) => void;
};

const NumberInput = ({ width, disableInput, onChange, ...restProps }: NumberInputProps) => {
  return (
    <BaseNumberInput
      slots={{ root: StyledRoot, input: StyledInput, incrementButton: IconButton, decrementButton: IconButton }}
      slotProps={{
        input: {
          style: { minWidth: width, width },
          disabled: disableInput,
        },
        incrementButton: {
          size: 'small',
          color: 'primary',
          children: <AddIcon fontSize="small" />,
        },
        decrementButton: {
          size: 'small',
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      onChange={onChange ? (event, newValue) => onChange(newValue) : undefined}
      {...restProps}
    />
  );
};

const StyledRoot = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  .base-NumberInput-incrementButton {
    order: 3;
  }
`;

const StyledInput = styled.input`
  outline: 0;
  min-width: 1rem;
  text-align: center;
  background: transparent;
  border: 0;
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
`;

export default NumberInput;
