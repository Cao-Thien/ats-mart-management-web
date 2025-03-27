import { memo } from 'react';
import { styled } from '@mui/material/styles';
import dayjs, { dateAdapter } from 'locales/dayjs';

// COMPONENTS
import { GridColDef, useGridApiContext, GridRenderEditCellParams } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { TextFieldProps } from '@mui/material/TextField';

// CONSTANTS
import { Any } from 'constants/types';

// Edit Renderer
const GridEditDateInput = styled(InputBase)`
  font-size: inherit;
  padding: '0 9px';
`;

const WrappedGridEditDateInput = (props: TextFieldProps) => {
  const { InputProps, focused: _focused, ...inputBaseProps } = props;
  return <GridEditDateInput fullWidth {...InputProps} {...(inputBaseProps as InputBaseProps)} />;
};

const GridEditDateCell = memo(
  ({ id, field, value, colDef }: GridRenderEditCellParams<Any, dayjs.Dayjs | null, string>) => {
    const apiRef = useGridApiContext();

    const Component = colDef.type === 'dateTime' ? DateTimePicker : DatePicker;

    const handleChange = (newValue: unknown) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
      <Component
        value={dayjs(value)}
        autoFocus
        onChange={handleChange}
        slots={{ textField: WrappedGridEditDateInput }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

GridEditDateCell.displayName = 'GridEditDateCell';

const defaultRenderEditCell = (params: GridRenderEditCellParams) => <GridEditDateCell {...params} />;

// Value Formatter
const defaultDateValueFormatter = (value: dayjs.Dayjs) => {
  if (value) {
    return dateAdapter.format(value, 'keyboardDate');
  }

  return '';
};

const defaultDateTimeValueFormatter = (value: dayjs.Dayjs) => {
  if (value) {
    return dateAdapter.format(value, 'keyboardDateTime24h');
  }

  return '';
};

const convertDateColumn = ({
  valueFormatter,
  renderEditCell = defaultRenderEditCell,
  width,
  ...column
}: GridColDef): GridColDef => {
  return {
    width: width ?? (column.type === 'dateTime' ? 160 : 130),
    valueFormatter:
      valueFormatter ?? (column.type === 'dateTime' ? defaultDateTimeValueFormatter : defaultDateValueFormatter),
    renderEditCell,
    ...column,
  };
};

export default convertDateColumn;
